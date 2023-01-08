import { useRef, useState } from 'react'
import { WebRTC } from '@processes/WebRTC'

export const LOCAL_VIDEO = 'LOCAL_VIDEO'
export const useWebRTC = (roomId: string) => {
	const [peerConnections, setPeerConnections] = useState<WebRTC[]>([])
	const localMediaStream = useRef()
}
