import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

export const getTypeOrmConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: 'localhost',
	port: configService.get('PORT'),
	database: configService.get('DATA_BASE'),
	username: configService.get('USER_NAME'),
	password: configService.get('PASSWORD'),
	autoLoadEntities: true,
	synchronize: true
})
