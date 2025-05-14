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
import { BanUserDto } from './dto/ban-user.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from './guards/auth.guard';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(
		private readonly authRepository: UsersRepository,
		private readonly authService: UsersService,
	) {}

	@Get('me')
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	async getMe(@Req() req: AuthorizedRequest) {
		return req.user;
	}

	@Get(':uuid')
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@ApiParam({
		name: 'uuid',
		description: 'UUID of the user',
		type: 'string',
	})
	async getUser(@Param('uuid') uuid: string) {
		return await this.authService.getSafeUserData(uuid);
	}

	@Post('')
	async signUp(@Body() body: SignupDto) {
		const newUser = await this.authRepository.createUser(body);
		const accessToken = await this.authService.generateToken(newUser.uuid);
		return {
			accessToken,
			user: newUser,
		};
	}

	@Post('ban')
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	async banUser(@Req() req: AuthorizedRequest, @Body() body: BanUserDto) {
		return await this.authRepository.addBan(req.user.uuid, body.uuid);
	}
}
