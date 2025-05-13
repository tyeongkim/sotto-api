import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthRepository } from './repositories/auth.repository';

@Module({
	imports: [PrismaModule],
	controllers: [AuthController],
	providers: [AuthService, AuthRepository, AuthGuard],
	exports: [AuthService, AuthGuard, AuthRepository],
})
export class AuthModule {}
