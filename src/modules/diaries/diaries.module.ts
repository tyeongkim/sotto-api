import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { DiariesController } from './diaries.controller';
import { DiariesService } from './diaries.service';
import { DiariesRepository } from './repositories/diaries.repository';

@Module({
	imports: [UsersModule, PrismaModule],
	controllers: [DiariesController],
	providers: [DiariesService, DiariesRepository],
})
export class DiariesModule {}
