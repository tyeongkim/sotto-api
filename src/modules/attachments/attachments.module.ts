import { MinioModule } from '@/common/modules/minio/minio.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AttachmentsController } from './attachments.controller';

@Module({
	imports: [UsersModule, MinioModule],
	controllers: [AttachmentsController],
})
export class AttachmentsModule {}
