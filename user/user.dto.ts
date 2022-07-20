import { IsEmail, IsString, MinLength } from 'class-validator'

export class UserDto {
	@IsEmail()
	email: string
	@MinLength(6, {
		message: 'Не менее 6 символов'
	})
	password?: string

	@IsString()
	name: string

	@IsString()
	avatarPath: string
}
