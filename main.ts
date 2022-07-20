import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	// cors
	app.enableCors()
	// /api
	app.setGlobalPrefix('api')
	// port
	await app.listen(4200)
}
bootstrap()
