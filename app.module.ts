import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppService } from './app.service'

import { AppController } from './app.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getTypeOrmConfig } from './config/typeorm.config'
import { UserModule } from './user/user.module'
import { CommentModule } from './comment/comment.module'
import { AuthModule } from './auth/auth.module'
import { AirportModule } from './airport/airport.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getTypeOrmConfig
		}),
		UserModule,
		CommentModule,
		AuthModule,
		AirportModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
