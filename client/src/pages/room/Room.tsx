import { FC } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Flex } from 'antd'
import { PhoneOutlined } from '@ant-design/icons'

import { LOCAL_VIDEO, useWebRTC } from '@hooks/useWebRTC'
import styles from './Room.module.scss'

export const Room: FC = () => {
	const navigate = useNavigate()

	const { id: roomId } = useParams()
	const { clients, provideMediaRef } = useWebRTC(roomId as string)

	const leaveRoom = () => {
		navigate('/')
	}

	return (
		<Flex align='center' vertical>
			<div className={styles.header}>
				<p>Комната #{roomId}</p>
			</div>
			<div className={styles.clientsWrapper}>
				<div className={styles.clients}>
					{clients.map(client => (
						<video
							className={styles.client}
							key={client}
							width={355}
							height={200}
							ref={target => provideMediaRef(client, target as HTMLVideoElement)}
							muted={client === LOCAL_VIDEO}
							autoPlay
							playsInline
						/>
					))}
				</div>
			</div>
			<div className={styles.footer}>
				<button className={styles.leaveButton} onClick={leaveRoom}>
					<PhoneOutlined />
				</button>
			</div>
		</Flex>
	)
}
