import { AuthorizedRequest } from '@/types/request';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Patch,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { BanUserDto } from './dto/ban-user.dto';
import { SignupDto } from './dto/signup.dto';
import { UpdateMeDto } from './dto/update-me.dto';
import { AuthGuard } from './guards/auth.guard';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(
		private readonly authRepository: UsersRepository,
		private readonly authService: UsersService,
	) {}

	@Get('')
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	async getUsers(
		@Query('username') username: string,
		@Req() req: AuthorizedRequest,
	) {
		if (!username) {
			throw new HttpException('Username is required', 400);
		}
		return this.authRepository.searchUsersByUsername(username, req.user.uuid);
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

	@Get('me')
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	async getMe(@Req() req: AuthorizedRequest) {
		return req.user;
	}

	@Patch('me')
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	async updateMe(@Req() req: AuthorizedRequest, @Body() body: UpdateMeDto) {
		return await this.authRepository.updateUser(req.user.uuid, body);
	}

	@Delete('me')
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	async deleteMe(@Req() req: AuthorizedRequest) {
		return await this.authRepository.deleteUser(req.user.uuid);
	}

	@Post('ban')
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	async banUser(@Req() req: AuthorizedRequest, @Body() body: BanUserDto) {
		return await this.authRepository.addBan(req.user.uuid, body.uuid);
	}
}
