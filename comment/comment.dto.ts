import { IsNumber, IsString } from 'class-validator'

export class CommentDto {
	@IsString()
	message: string

	@IsNumber()
	airportId: number
}
