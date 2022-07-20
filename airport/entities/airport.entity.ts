import { Base } from '../../utils/base'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { UserEntity } from '../../user/user.entity'
import { CommentEntity } from '../../comment/comment.entity'

@Entity('Airport')
export class AirportEntity extends Base {
	@Column()
	name: string

	@ManyToOne(() => UserEntity, user => user.airports)
	@JoinColumn({ name: 'user_id' })
	user: UserEntity

	@OneToMany(() => CommentEntity, comment => comment.airport)
	comments: CommentEntity[]
	views: Number
}
