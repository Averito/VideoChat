import { FC } from 'react'
import { useParams } from 'react-router'

import { LOCAL_VIDEO, useWebRTC } from '@hooks/useWebRTC'

export const Room: FC = () => {
	const { id: roomId } = useParams()
	const { clients, provideMediaRef } = useWebRTC(roomId as string)

	return (
		<div>
			<p>Room {roomId}</p>
			{clients.map(client => (
				<video
					key={client}
					width={500}
					height={350}
					ref={target => provideMediaRef(client, target as HTMLVideoElement)}
					muted={client === LOCAL_VIDEO}
					autoPlay
					playsInline
				/>
			))}
			{JSON.stringify(clients, null, 2)}
		</div>
	)
}
