import { Module } from '@nestjs/common'

import { SessionsGateway } from './sessions.gateway'
import { SessionsService } from './sessions.service'

@Module({
	providers: [SessionsGateway, SessionsService]
})
export class SessionsModule {
}
