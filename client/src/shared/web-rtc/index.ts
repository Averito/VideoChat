import { RTCConfig } from '@shared/web-rtc/config'

export class WebRTC extends RTCPeerConnection {
	constructor() {
		super(RTCConfig)
	}
}
