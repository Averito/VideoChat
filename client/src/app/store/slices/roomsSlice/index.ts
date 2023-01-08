import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRoom } from '@app/store/slices/roomsSlice/rooms.types'

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
		addRoom(state, { payload }: PayloadAction<string>) {
			state.rooms.push({ id: payload })
		},
		removeRoom(state, { payload }: PayloadAction<string>) {
			state.rooms = state.rooms.filter(room => room.id !== payload)
		},
		setCurrentRoom(state, { payload }: PayloadAction<string>) {
			state.currentRoom = { id: payload }
		}
	}
})

export const roomsReducer = roomsSlice.reducer
export const { setRooms, addRoom, setCurrentRoom, removeRoom } = roomsSlice.actions
