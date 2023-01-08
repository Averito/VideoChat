import { Module } from '@nestjs/common'

import { SessionsModule } from './sessions/sessions.module'

@Module({
	imports: [SessionsModule],
	controllers: [],
	providers: []
})
export class AppModule {
}
