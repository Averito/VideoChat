import { FC } from 'react'
import { Flex } from 'antd'

import { RoomCardProps } from './RoomCard.types'
import styles from './RoomCard.module.scss'
import { useNavigate } from 'react-router'

export const RoomCard: FC<RoomCardProps> = ({ roomId }) => {
	const navigateTo = useNavigate()

	const onEnter = () => {
		navigateTo(`/room/${roomId}`)
	}

	return (
		<Flex className={styles.container} align='center'>
			<p className={styles.text}>Комната #{roomId}</p>
			<button className={styles.enterInRoom} onClick={onEnter}>
				Войти
			</button>
		</Flex>
	)
}
