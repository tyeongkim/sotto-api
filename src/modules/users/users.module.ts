import { PrismaModule } from '@/common/modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [PrismaModule],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository, AuthGuard],
	exports: [UsersService, AuthGuard, UsersRepository],
})
export class UsersModule {}
