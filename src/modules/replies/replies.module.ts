import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { DiariesModule } from '../diaries/diaries.module';
import { UsersModule } from '../users/users.module';
import { RepliesController } from './replies.controller';
import { RepliesService } from './replies.service';
import { RepliesRepository } from './repositories/replies.repository';

@Module({
	imports: [UsersModule, DiariesModule, PrismaModule],
	controllers: [RepliesController],
	providers: [RepliesService, RepliesRepository],
	exports: [RepliesService, RepliesRepository],
})
export class RepliesModule {}
