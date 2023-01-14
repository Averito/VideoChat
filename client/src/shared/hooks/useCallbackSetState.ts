import { useEffect, useRef, useState } from 'react'

export type CallbackSetStateAction<T> = (value: ((prevState: T) => T) | T, cb?: (state: T) => void) => void
export const useCallbackSetState = <T>(initialValue: T): [T, CallbackSetStateAction<T>] => {
	const [value, setValue] = useState<T>(initialValue)

	const callback = useRef<((state: T) => void) | null>(null)
	const setValueModify = (value: ((prevState: T) => T) | T, cb?: (state: T) => void): void => {
		if (cb) callback.current = cb
		setValue(value)
	}

	useEffect(() => {
		if (!callback) return

		callback.current?.(value)
		callback.current = null
	}, [value])

	return [value, setValueModify]
}
