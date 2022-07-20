import { IsString } from 'class-validator'

export class AirportDto {
	@IsString()
	name: string
}
