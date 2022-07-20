import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { UserDto } from './user.dto'
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {}
	// by-id
	async byId(id: number) {
		const user = await this.userRepository.findOne({
			where: {
				id
			},
			relations: {
				airports: true
			},
			order: {
				createdAt: 'DESC'
			}
		})
		if (!user) throw new NotFoundException('User not found!')
		return user
	}
	// update
	async updateProfile(id: number, dto: UserDto) {
		const user = await this.byId(id)

		const isSameUser = await this.userRepository.findOneBy({ email: dto.email })
		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email занят')
		if (dto.password) {
			const salt = await genSalt(5)
			user.password = await hash(dto.password, salt)
		}
		user.email = dto.email
		user.name = dto.name
		user.avatarPath = dto.avatarPath

		return this.userRepository.save(user)
	}
	//getAll
	async getAll() {
		return this.userRepository.find()
	}
}
