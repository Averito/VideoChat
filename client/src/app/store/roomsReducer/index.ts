import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRoom } from '@app/store/roomsReducer/rooms.types'

const roomsSlice = createSlice({
	name: 'rooms',
	initialState: {
		currentRoom: {} as IRoom,
		rooms: [] as IRoom[]
	},
	reducers: {
		setRooms(state, { payload }: PayloadAction<string[]>) {
			state.rooms = payload.map(roomId => ({ id: roomId }))
		},
		setCurrentRoom(state, { payload }: PayloadAction<string>) {
			state.currentRoom = { id: payload }
		}
	}
})

export const roomsReducer = roomsSlice.reducer
export const { setRooms, setCurrentRoom } = roomsSlice.actions
