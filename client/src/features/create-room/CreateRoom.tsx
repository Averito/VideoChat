import { useNavigate } from 'react-router'
import { FC, Fragment, useState } from 'react'
import { v4 } from 'uuid'
import { Button, Modal, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { CopyToClipboard } from '@ui/copy-to-clipboard'

export const CreateRoom: FC = () => {
	const navigate = useNavigate()
	const [modalActive, setModalActive] = useState<boolean>(false)
	const [roomId, setRoomId] = useState<string>('')

	const openModal = () => {
		setModalActive(true)
		setRoomId(v4())
	}

	const closeModal = () => {
		setModalActive(false)
	}

	const createRoom = () => {
		navigate(`/room/${roomId}`)
	}

	const roomLink = `${window.location.origin}/room/${roomId}`

	return (
		<Fragment>
			<Modal open={modalActive} onCancel={closeModal} onOk={createRoom} cancelText='Отмена' okText='Войти в комнату'>
				<Typography.Paragraph>
					Поздравляю! Вы создали видео-чат комнату.
					<br />
					Пригласить кого-нибудь вы можете скинув ссылку ниже:
				</Typography.Paragraph>

				<CopyToClipboard text={roomLink} />
			</Modal>
			<Button onClick={openModal} icon={<PlusOutlined />}>
				Создать комнату
			</Button>
		</Fragment>
	)
}
