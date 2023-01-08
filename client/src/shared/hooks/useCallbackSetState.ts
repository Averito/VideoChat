import { useEffect, useState } from 'react'

export type CallbackSetStateAction<T> = (value: (<T>(prevState: T) => T) | T, cb: (state: T) => void) => void
export const useCallbackSetState = <T>(initialValue: T): [T, CallbackSetStateAction<T>] => {
	const [value, setValue] = useState<T>(initialValue)

	let callback: ((state: T) => void) | null = null
	const setValueModify = (value: (<T>(prevState: T) => T) | T, cb: (state: T) => void): void => {
		setValue(value)
		callback = cb
	}

	useEffect(() => {
		if (!callback) return

		callback(value)
		callback = null
	}, [value])

	return [value, setValueModify]
}
