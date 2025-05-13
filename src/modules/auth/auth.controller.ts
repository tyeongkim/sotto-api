import { AuthorizedRequest } from '@/types/request';
import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from './guards/auth.guard';
import { AuthRepository } from './repositories/auth.repository';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly authService: AuthService,
	) {}

	@Get('me')
	@UseGuards(AuthGuard)
	async getMe(@Req() req: AuthorizedRequest) {
		return req.user;
	}

	@Get(':uuid')
	@ApiParam({
		name: 'uuid',
		description: 'UUID of the user',
		type: 'string',
	})
	async getUser(@Param('uuid') uuid: string) {
		return await this.authService.getSafeUserData(uuid);
	}

	@Post('signup')
	async signUp(@Body() body: SignupDto) {
		return await this.authRepository.createUser(body);
	}
}
