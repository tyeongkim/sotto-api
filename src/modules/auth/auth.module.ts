import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthRepository } from './repositories/auth.repository';

@Module({
	imports: [PrismaModule],
	providers: [AuthService, AuthRepository, AuthGuard],
	exports: [AuthService, AuthGuard, AuthRepository],
})
export class AuthModule {}
