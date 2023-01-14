export enum Actions {
	JOIN = 'join',
	LEAVE = 'leave',
	SHARE_ROOMS = 'share-rooms',
	ADD_PEER = 'add-peer',
	REMOVE_PEER = 'remove-peer',
	RELAY_SDP = 'relay-sdp',
	RELAY_ICE = 'relay-ice',
	ICE_CANDIDATE = 'ice-candidate',
	SESSION_DESCRIPTION = 'session-description'
}

export interface AddPeerResponse {
	peerId: string
	createOffer: boolean
}

export interface RemovePeerResponse {
	peerId: string
}

export interface SessionDescriptionResponse {
	peerId: string
	sessionDescription: RTCSessionDescription
}

export interface IceCandidateResponse {
	peerId: string
	iceCandidate: RTCIceCandidate
}

export interface IRoom {
	id: string
}
