import { Module } from '@nestjs/common'
import { AirportService } from './airport.service'
import { AirportController } from './airport.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AirportEntity } from './entities/airport.entity'

@Module({
	controllers: [AirportController],
	providers: [AirportService],
	imports: [TypeOrmModule.forFeature([AirportEntity])]
})
export class AirportModule {}
