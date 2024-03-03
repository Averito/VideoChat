import freeice from 'freeice'

export const RTCConfig: RTCConfiguration = {
	iceServers: freeice()
}
