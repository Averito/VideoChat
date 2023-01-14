import { useEffect, useRef } from 'react'
import { socket } from '@processes/socket'
import {
	Actions,
	AddPeerResponse,
	IceCandidateResponse,
	RemovePeerResponse,
	SessionDescriptionResponse
} from '@app/store/slices/roomsSlice/rooms.types'
import { WebRTC } from '@processes/WebRTC'
import { useCallbackSetState } from '@hooks/useCallbackSetState'
import { notifications } from '@utils/notifications'

export const LOCAL_VIDEO = 'LOCAL_VIDEO'

interface useWebRTCReturn {
	clients: string[]
	provideMediaRef: (id: string, videoElement: HTMLVideoElement) => void
}

export const useWebRTC = (roomId: string): useWebRTCReturn => {
	const [clients, setClients] = useCallbackSetState<string[]>([])

	const peerConnections = useRef(new Map<string, RTCPeerConnection>())
	const peerMediaElements = useRef(new Map<string, HTMLVideoElement | null>([[LOCAL_VIDEO, null]]))
	let localMediaStream: MediaStream | null = null

	const addNewClient = (peerId: string, cb?: (state: string[]) => void) => {
		setClients(prevState => Array.from(new Set([...prevState, peerId])), cb)
	}

	useEffect(() => {
		const startCapture = async () => {
			const mediaStream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: 1280,
					height: 720
				},
				audio: true
			})
			localMediaStream = mediaStream

			addNewClient(LOCAL_VIDEO, () => {
				const localMediaElement = peerMediaElements.current.get(LOCAL_VIDEO)

				if (!localMediaElement) return
				localMediaElement.volume = 0
				localMediaElement.srcObject = mediaStream
			})
		}

		startCapture()
			.then(() => socket.emit(Actions.JOIN, { roomId }))
			.catch(() => notifications.error('Не удалось присоединиться к комнате, нет доступа к видео или звуку'))

		return () => {
			localMediaStream?.getTracks().forEach(track => track.stop())
			socket.emit(Actions.LEAVE)
		}
	}, [roomId])

	useEffect(() => {
		setClients(prevState => [...prevState, LOCAL_VIDEO])

		socket.on(Actions.ADD_PEER, async (response: AddPeerResponse) => {
			const { peerId, createOffer } = response

			if (clients.includes(peerId)) {
				return notifications.error(`Клиент ${peerId} уже подключён`)
			}

			const webRtcPeerConnection = new WebRTC()

			peerConnections.current.set(peerId, webRtcPeerConnection)
			const currentPeerConnection = peerConnections.current.get(peerId) as WebRTC

			currentPeerConnection.addEventListener('icecandidate', event => {
				if (!event.candidate) return

				socket.emit(Actions.RELAY_ICE, {
					peerId,
					iceCandidate: event.candidate
				})
			})

			localMediaStream?.getTracks().forEach(track => {
				if (!localMediaStream) return
				currentPeerConnection.addTrack(track, localMediaStream)
			})

			currentPeerConnection?.addEventListener('track', (event: RTCTrackEvent) => {
				const { streams } = event
				const [remoteStream] = streams

				addNewClient(peerId, () => {
					const currentPeerMediaElement = peerMediaElements.current.get(peerId)
					let settled = false

					const interval = setInterval(() => {
						if (currentPeerMediaElement) {
							currentPeerMediaElement.srcObject = remoteStream
							settled = true
						}

						if (settled) clearInterval(interval)
					}, 1000)
				})
			})

			if (createOffer) {
				const offer = await currentPeerConnection?.createOffer()
				await currentPeerConnection?.setLocalDescription(offer)

				socket.emit(Actions.RELAY_SDP, {
					peerId,
					sessionDescription: offer
				})
			}
		})

		return () => {
			socket.off(Actions.ADD_PEER)
		}
	}, [])

	useEffect(() => {
		socket.on(Actions.SESSION_DESCRIPTION, async (response: SessionDescriptionResponse) => {
			const { peerId, sessionDescription } = response

			const currentPeerConnection = peerConnections.current.get(peerId)

			const rtcSessionDescription = new RTCSessionDescription(sessionDescription)
			await currentPeerConnection?.setRemoteDescription(rtcSessionDescription)

			if (rtcSessionDescription.type !== 'offer') return
			const answer = await currentPeerConnection?.createAnswer()
			await currentPeerConnection?.setLocalDescription(answer)

			socket.emit(Actions.RELAY_SDP, {
				peerId,
				sessionDescription: answer
			})
		})

		return () => {
			socket.off(Actions.SESSION_DESCRIPTION)
		}
	}, [])

	useEffect(() => {
		socket.on(Actions.ICE_CANDIDATE, async (response: IceCandidateResponse) => {
			const { peerId, iceCandidate } = response

			const currentPeerConnection = peerConnections.current.get(peerId)

			if (!currentPeerConnection) return
			await currentPeerConnection.addIceCandidate(new RTCIceCandidate(iceCandidate))
		})

		return () => {
			socket.off(Actions.ICE_CANDIDATE)
		}
	}, [])

	useEffect(() => {
		socket.on(Actions.REMOVE_PEER, (removePeer: RemovePeerResponse) => {
			const { peerId } = removePeer
			const currentPeerConnection = peerConnections.current.get(peerId)

			if (currentPeerConnection) {
				currentPeerConnection.close()
			}

			peerConnections.current.delete(peerId)
			peerMediaElements.current.delete(peerId)

			setClients(prevState => prevState.filter(client => client !== peerId))
		})

		return () => {
			socket.off(Actions.REMOVE_PEER)
		}
	}, [])

	const provideMediaRef = (id: string, videoElement: HTMLVideoElement) => {
		peerMediaElements.current.set(id, videoElement)
	}

	return { clients, provideMediaRef }
}
