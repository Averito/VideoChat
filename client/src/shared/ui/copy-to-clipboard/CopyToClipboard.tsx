import { FC, useRef, useState } from 'react'
import { CopyToClipboardProps } from '@ui/copy-to-clipboard/CopyToClipboard.types'
import { Flex, Tooltip } from 'antd'
import { CopyOutlined } from '@ant-design/icons'

import styles from './CopyToClipboard.module.scss'

export const CopyToClipboard: FC<CopyToClipboardProps> = ({ text }) => {
	const [copied, setCopied] = useState<boolean>(false)

	const timeout = useRef<ReturnType<typeof setTimeout>>(0)
	const onCopied = async () => {
		if (timeout.current) clearTimeout(timeout.current)

		await window.navigator.clipboard.writeText(text)
		setCopied(true)

		timeout.current = setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	const tooltipTitle = copied ? 'Скопировано!' : 'Копировать'

	return (
		<Flex className={styles.container}>
			<p className={styles.text}>{text}</p>

			<Tooltip title={tooltipTitle}>
				<button className={styles.copyContainer} onClick={onCopied}>
					<CopyOutlined className={styles.copy} />
				</button>
			</Tooltip>
		</Flex>
	)
}
