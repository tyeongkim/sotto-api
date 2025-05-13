import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthRepository } from './repositories/auth.repository';

@Controller('auth')
export class AuthController {
	constructor(private readonly authRepository: AuthRepository) {}

	@Post('signup')
	async signUp(@Body() body: SignupDto) {
		return await this.authRepository.createUser(body);
	}
}
