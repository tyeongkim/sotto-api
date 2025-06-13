import { MinioService } from '@/common/modules/minio/minio.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../users/guards/auth.guard';

@Controller('attachments')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class AttachmentsController {
	constructor(private readonly minioService: MinioService) {}

	@Get('presigned-url')
	@ApiQuery({
		name: 'fileName',
		required: false,
		description:
			'The name of the file to upload. If not provided, a random UUID will be used.',
	})
	async getPresignedUrl(
		@Query('fileName') fileName: string = crypto.randomUUID(),
	) {
		return {
			url: await this.minioService.getUploadPresignedUrl(fileName),
			fileName: fileName,
		};
	}

	@Get('object-url')
	getObjectUrl(@Query('fileName') fileName: string) {
		if (!fileName) {
			throw new Error('File name is required to get the object URL.');
		}
		return this.minioService.getObjectUrl(fileName);
	}
}
