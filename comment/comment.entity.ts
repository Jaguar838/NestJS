import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { Base } from '../utils/base'
import { AirportEntity } from '../airport/entities/airport.entity'

@Entity('Comment')
export class CommentEntity extends Base {
	@Column({ default: '', type: 'text' })
	message: string

	@ManyToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@ManyToOne(() => AirportEntity, airport => airport.comments)
	@JoinColumn({ name: 'airport_id' })
	airport: AirportEntity
}
