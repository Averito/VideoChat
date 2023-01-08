import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { IoAdapter } from '@nestjs/platform-socket.io'

const PORT = process.env.PORT || 5001
const bootstrap = async () => {
	const app = await NestFactory.create(AppModule)

	app.useWebSocketAdapter(new IoAdapter(app))

	await app.listen(PORT)
	console.log(`Server is started on ${PORT} port`)
}
bootstrap()
