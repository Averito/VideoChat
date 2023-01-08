import { FC, Fragment, useEffect } from 'react'
import { Space } from 'antd'

import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { socket } from '@processes/socket'
import { Actions } from '@app/store/slices/roomsSlice/rooms.types'
import { CreateRoom } from '@widgets/create-room'
import { setRooms } from '@app/store/slices/roomsSlice'
import { EnterInRoom } from '@widgets/enter-in-room'

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
				<Fragment key={room.id}>
					<Space>
						<span>{room.id}</span>
						<EnterInRoom roomId={room.id} />
					</Space>
					<br />
				</Fragment>
			))}
			<CreateRoom />
		</div>
	)
}
