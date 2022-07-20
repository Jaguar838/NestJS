import { Injectable, NotFoundException } from '@nestjs/common'
import { AirportDto } from './dto/airport.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm'
import { AirportEntity } from './entities/airport.entity'

@Injectable()
export class AirportService {
	constructor(
		@InjectRepository(AirportEntity)
		private readonly airportRepository: Repository<AirportEntity>
	) {}
	// create
	async create(userId: number) {
		const defaultValues = {
			name: '',
			user: { id: userId }
		}
		const newAirport = this.airportRepository.create(defaultValues)
		const airport = await this.airportRepository.save(newAirport)
		return airport.id
	}

	// delete
	async delete(id: number) {
		return this.airportRepository.delete({ id })
	}

	// by-id
	async byId(id: number) {
		const airport = await this.airportRepository.findOne({
			where: {
				id
			},
			relations: {
				user: true,
				comments: {
					user: true
				}
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true,
					subscribersCount: true
				},
				comments: {
					message: true,
					id: true,
					user: {
						id: true,
						name: true,
						avatarPath: true,
						isVerified: true,
						subscribersCount: true
					}
				}
			}
		})
		if (!airport) throw new NotFoundException('Airport not found!')
		return airport
	}

	// update
	async update(id: number, dto: AirportDto) {
		const airport = await this.byId(id)

		return this.airportRepository.save({
			...airport,
			...dto
		})
	}

	//getAll
	async getAll(searchTerm?: string) {
		let options: FindOptionsWhereProperty<AirportEntity> = {}
		if (searchTerm)
			options = {
				name: ILike('%${searchTerm}%')
			}
		return this.airportRepository.find({
			where: {
				...options
			},
			order: {
				createdAt: 'DESC'
			},
			relations: {
				user: true,
				comments: {
					user: true
				}
			},
			select: {
				user: {
					id: true,
					name: true,
					avatarPath: true,
					isVerified: true
				}
			}
		})
	}

	// updateCountViews
	async updateCountViews(id: number) {
		const airport = await this.byId(id)
		// airport.views++

		return this.airportRepository.save(airport)
	}
}
