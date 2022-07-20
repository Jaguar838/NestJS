import { Injectable } from '@nestjs/common'
import { IMediaResponse } from './media.interface'
import { writeFile, ensureDir } from 'fs-extra'
import { path } from 'app-root-path'

@Injectable()
export class MediaService {
	async saveMedia(
		mediaFile: Express.Multer.File,
		folder = 'default'
	): Promise<IMediaResponse> {
		const uploadFolder = `${path}/uploads/${folder}`
		await ensureDir(uploadFolder)

		await writeFile(
			`${uploadFolder}/${mediaFile.originalname}`,
			mediaFile.buffer
		)
		return {
			url: `/uploads/${folder}/${mediaFile.originalname}`,
			name: mediaFile.originalname
		}
	}
}
