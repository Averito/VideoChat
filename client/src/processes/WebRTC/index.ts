import { RTCConfig } from '@processes/WebRTC/config'

export class WebRTC extends RTCPeerConnection {
	constructor() {
		super(RTCConfig)
	}
}
