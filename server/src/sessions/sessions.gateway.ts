import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { SessionsService } from './sessions.service'
import { SessionActions } from './sessions.types'

@WebSocketGateway({
	namespace: 'sessions',
	transports: ['websocket'],
	connectTimeout: 10000,
	cors: true
})
export class SessionsGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {
	constructor(private sessionsService: SessionsService) {
	}

	handleConnection() {
		this.sessionsService.shareRoomsInfo()
	}

	handleDisconnect(socket: Socket) {
		this.sessionsService.leaveAll(socket)
	}

	afterInit(server: Server) {
		this.sessionsService.server = server
	}

	@SubscribeMessage(SessionActions.JOIN)
	handleJoin(@ConnectedSocket() socket: Socket, @MessageBody('roomId') roomId: string) {
		return this.sessionsService.join(socket, roomId)
	}

	@SubscribeMessage(SessionActions.LEAVE)
	handleLeave(@ConnectedSocket() socket: Socket, @MessageBody('roomId') roomId: string) {
		return this.sessionsService.leave(socket, roomId)
	}

	@SubscribeMessage(SessionActions.SHARE_ROOMS)
	handleShareRooms(@MessageBody('rooms') rooms: string[]) {
		return rooms
	}

	// @SubscribeMessage('add-peer')
	// handleAddPeer() {}
	//
	// @SubscribeMessage('remove-peer')
	// handleRemovePeer() {}
	//
	// @SubscribeMessage('relay-sdp')
	// handleRelaySdp() {}
	//
	// @SubscribeMessage('relay-ice')
	// handleRelayIce() {}
	//
	// @SubscribeMessage('ice-candidate')
	// handleIceCandidate() {}
	//
	// @SubscribeMessage('session-description')
	// handleSessionDescription() {}
}
