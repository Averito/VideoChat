import { toast } from 'react-toastify'

export class Notifications {
	public success(text: string) {
		toast.success(text)
	}

	public error(text: string) {
		toast.error(text)
	}

	public warning(text: string) {
		toast.warning(text)
	}
}

export const notifications = new Notifications()
