import { FC } from 'react'
import { useNavigate } from 'react-router'

import { IEnterInRoomProps } from '@widgets/enter-in-room/EnterInRoom.types'
import { AppButton } from '@ui/buttons'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { setCurrentRoom } from '@app/store/slices/roomsSlice'

export const EnterInRoom: FC<IEnterInRoomProps> = props => {
	const { roomId } = props

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const onClickEnterInRoom = async () => {
		navigate(`/room/${roomId}`)
		dispatch(setCurrentRoom(roomId))
	}

	return (
		<AppButton width={'auto'} onClick={onClickEnterInRoom}>
			Войти
		</AppButton>
	)
}
