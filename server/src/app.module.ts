import { Module } from '@nestjs/common'

import { SessionsModule } from './sessions/sessions.module'
import { AppController } from './app.controller'

@Module({
	imports: [SessionsModule],
	controllers: [AppController],
	providers: []
})
export class AppModule {
}
