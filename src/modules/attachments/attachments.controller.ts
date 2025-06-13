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
	getPresignedUrl(@Query('fileName') fileName: string) {
		return this.minioService.getPresignedUrl(fileName);
	}
}
