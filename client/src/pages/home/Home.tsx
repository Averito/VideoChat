import { FC, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { socket } from '@processes/socket'
import { Actions } from '@app/store/slices/roomsSlice/rooms.types'
import { CreateRoom } from '@widgets/create-room'
import { setRooms } from '@app/store/slices/roomsSlice'

export const Home: FC = () => {
	const dispatch = useAppDispatch()
	const rooms = useAppSelector(state => state.rooms.rooms)

	useEffect(() => {
		socket.on(Actions.SHARE_ROOMS, (rooms: { rooms: string[] }) => {
			dispatch(setRooms(rooms.rooms))
		})
	}, [])

	return (
		<div>
			<p>Home</p>
			{rooms.map(room => (
				<div key={room.id}>
					<p>{room.id}</p>
					<NavLink to={`/room/${room.id}`}>Войти</NavLink>
				</div>
			))}
			<CreateRoom />
		</div>
	)
}
