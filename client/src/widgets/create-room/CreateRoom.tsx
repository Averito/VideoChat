import { useNavigate } from 'react-router'
import { FC } from 'react'
import { v4 } from 'uuid'

import { AppButton } from '@ui/buttons'
import { socket } from '@processes/socket'
import { Actions } from '@app/store/slices/roomsSlice/rooms.types'

export const CreateRoom: FC = () => {
	const navigate = useNavigate()

	const onClickCreateRoom = () => {
		const roomId = v4()

		socket.emit(Actions.JOIN, { roomId })
		navigate(`/room/${roomId}`)
	}

	return <AppButton width='150px' onClick={onClickCreateRoom}>Создать комнату</AppButton>
}
