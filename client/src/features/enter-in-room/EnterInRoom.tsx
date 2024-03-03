import { FC } from 'react'
import { useNavigate } from 'react-router'
import { Button } from 'antd'

import { IEnterInRoomProps } from '../enter-in-room/EnterInRoom.types'
import { useAppDispatch } from '@hooks/useAppDispatch'
import { setCurrentRoom } from 'app/store/roomsReducer'

export const EnterInRoom: FC<IEnterInRoomProps> = props => {
	const { roomId } = props

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const onClickEnterInRoom = async () => {
		navigate(`/room/${roomId}`)
		dispatch(setCurrentRoom(roomId))
	}

	return <Button onClick={onClickEnterInRoom}>Войти</Button>
}
