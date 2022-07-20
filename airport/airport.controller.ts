import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Query,
	UsePipes,
	ValidationPipe,
	HttpCode,
	Put
} from '@nestjs/common'
import { AirportService } from './airport.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { UserDto } from '../user/user.dto'
import { CurrentUser } from '../user/user.decorator'

@Controller('airport')
export class AirportController {
	constructor(private readonly airportService: AirportService) {}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.airportService.getAll(searchTerm)
	}

	@Get(':id')
	async getAirport(@Param('id') id: string) {
		return this.airportService.byId(+id)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async createAirport(@CurrentUser('id') id: number) {
		return this.airportService.create(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
		return this.airportService.update(+id, dto)
	}

	@HttpCode(200)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.airportService.delete(+id)
	}

	@HttpCode(200)
	@Put('update-views:airportId')
	async updateViews(@Param('videoId') airportId: string) {
		return this.airportService.updateCountViews(+airportId)
	}
}
