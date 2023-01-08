import { FC } from 'react'
import { useNavigate } from 'react-router'

import { IEnterInRoomProps } from '@widgets/enter-in-room/EnterInRoom.types'
import { AppButton } from '@ui/buttons'
import { socket } from '@processes/socket'
import { Actions } from '@app/store/slices/roomsSlice/rooms.types'

export const EnterInRoom: FC<IEnterInRoomProps> = props => {
	const { roomId } = props

	const navigate = useNavigate()

	const onClickEnterInRoom = async () => {
		socket.emit(Actions.JOIN, { roomId })
		navigate(`/room/${roomId}`)
	}

	return (
		<AppButton width={'auto'} onClick={onClickEnterInRoom}>
			Войти
		</AppButton>
	)
}
