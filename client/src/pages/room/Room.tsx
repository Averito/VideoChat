import { FC } from 'react'
import { useParams } from 'react-router'

export const Room: FC = () => {
	const { id: roomId } = useParams()

	return (
		<div>
			<p>Room {roomId}</p>
		</div>
	)
}
