import React, { FC, memo, PropsWithChildren } from 'react'
import { Button } from 'antd'

import styles from './AppButton.module.scss'
import { IAppButtonProps } from '@ui/buttons/app-button/AppButton.types'
import { cs } from '@utils/classnames'

export const AppButton: FC<PropsWithChildren<IAppButtonProps>> = memo(props => {
	const { margin, width = '100%', children, className } = props

	return (
		<Button className={cs(styles.button, className)} style={{ margin, width }} {...props}>
			{children}
		</Button>
	)
})
