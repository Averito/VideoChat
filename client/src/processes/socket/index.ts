import { io } from 'socket.io-client'

import { SERVER_URI } from 'variables'

export const socket = io(`${SERVER_URI}/sessions`, {
	transports: ['websocket'],
	timeout: 10000,
	reconnectionAttempts: 50
})
