import { FC, useEffect } from 'react'
import { Empty, Flex, Space, Typography } from 'antd'

import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { socket } from 'shared/socket'
import { Actions } from '@app/store/roomsReducer/rooms.types'
import { setRooms } from 'app/store/roomsReducer'
import { CreateRoom } from '@features/create-room'
import { RoomCard } from '@widgets/room-card'
import styles from './Home.module.scss'

export const Home: FC = () => {
	const dispatch = useAppDispatch()
	const rooms = useAppSelector(state => state.rooms.rooms)

	useEffect(() => {
		socket.on(Actions.SHARE_ROOMS, (rooms: { rooms: string[] }) => {
			dispatch(setRooms(rooms.rooms))
		})
	}, [])

	return (
		<Flex className={styles.container} align='center' vertical>
			<Typography.Title level={1}>Video Chat By Averito</Typography.Title>
			<CreateRoom />
			<div className={styles.roomsContainer}>
				{rooms.length > 0 && <Typography.Title level={3}>Комнаты:</Typography.Title>}
				<Space direction='vertical'>
					{rooms.length === 0 && <Empty description='Нет комнат. Будьте первыми!' />}
					{rooms.map(room => (
						<RoomCard roomId={room.id} key={room.id} />
					))}
				</Space>
			</div>
		</Flex>
	)
}
