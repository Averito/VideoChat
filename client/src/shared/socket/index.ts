import { io } from 'socket.io-client'

export const socket = io(`${import.meta.env.VITE_SERVER_URI}/sessions`, {
	transports: ['websocket'],
	timeout: 10000,
	reconnectionAttempts: 50
})
