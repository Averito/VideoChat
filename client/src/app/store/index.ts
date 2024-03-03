import { configureStore } from '@reduxjs/toolkit'
import { roomsReducer } from 'app/store/roomsReducer'

export const store = configureStore({
	reducer: {
		rooms: roomsReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
