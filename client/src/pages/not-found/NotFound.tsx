import { FC, useEffect } from 'react'

import styles from './NotFound.module.scss'
import { useLocation, useNavigate } from 'react-router'
import { Empty } from 'antd'

export const NotFound: FC = () => {
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			navigate('/')
		}, 3000)
	}, [])

	return (
		<div className={styles.container}>
			<Empty description={`${location.pathname} страница не найдена. Через 3 секунды вы будете перенаправлены на главную...`} />
		</div>
	)
}
