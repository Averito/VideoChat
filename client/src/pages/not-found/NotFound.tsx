import { FC } from 'react'

import styles from './NotFound.module.scss'
import { useLocation } from 'react-router'

export const NotFound: FC = () => {
	const location = useLocation()

	return (
		<div className={styles.container}>
			<p className={styles.text}>{location.pathname} страница не найдена</p>
		</div>
	)
}
