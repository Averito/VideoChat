import { BadGatewayException, Injectable } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import { validate, version } from 'uuid'

import { SessionActions } from './sessions.types'

@Injectable()
export class SessionsService {
	public server: Server = null

	public shareRoomsInfo() {
		this.server.emit(SessionActions.SHARE_ROOMS, {
			rooms: this.getRooms()
		})
	}

	public join(socket: Socket, roomId: string) {
		const clients = this.getClients(roomId)

		clients.forEach((clientId: string) => {
			this.server.to(clientId).emit(SessionActions.ADD_PEER, {
				peerId: socket.id,
				createOffer: false
			})

			socket.emit(SessionActions.ADD_PEER, {
				peerId: clientId,
				createOffer: true
			})
		})

		socket.join(roomId)
		this.shareRoomsInfo()
	}

	public leaveAll(socket: Socket) {
		const { rooms: joinedRooms } = socket

		Array.from(joinedRooms).forEach(roomId => {
			const clients = this.getClients(roomId)

			clients.forEach((clientId: string) => {
				this.server.to(clientId).emit(SessionActions.REMOVE_PEER, {
					peerId: socket.id
				})

				socket.emit(SessionActions.REMOVE_PEER, {
					peerId: clientId
				})
			})

			socket.leave(roomId)
		})

		this.shareRoomsInfo()
	}

	public relaySdp(peerId: string, sessionDescription: Record<string, string>, socketId: string) {
		this.server.to(peerId).emit(SessionActions.SESSION_DESCRIPTION, {
			peerId: socketId,
			sessionDescription
		})
	}

	public relayIce(peerId: string, iceCandidate: Record<string, string>, socketId: string) {
		this.server.to(peerId).emit(SessionActions.ICE_CANDIDATE, {
			peerId: socketId,
			iceCandidate
		})
	}

	public getRooms() {
		const rooms = (this.server as any).adapter?.rooms
		return Array.from(rooms?.keys() || []).filter((roomId: string) => validate(roomId) && version(roomId) === 4)
	}

	private getClients(roomId: string) {
		return Array.from((this.server as any).adapter?.rooms?.get(roomId) || [])
	}
}
