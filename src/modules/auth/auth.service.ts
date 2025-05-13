import { generateRandomString } from '@/common/utils/common.util';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {
	constructor(private readonly authRepository: AuthRepository) {}

	async validateToken(token: string) {
		const account = await this.authRepository.getUserHasToken(token);
		if (!account) {
			throw new HttpException('Invalid token', 401);
		}
		return account;
	}

	async generateToken(accountUUID: string) {
		const account = await this.authRepository.getUser(accountUUID);
		if (!account) {
			throw new HttpException('Account not found', 404);
		}
		if (account.accessToken.length >= 5) {
			throw new HttpException('Too many tokens', 400);
		}

		const token = generateRandomString(64);

		await this.authRepository.addAccessToken(accountUUID, token).catch(() => {
			throw new HttpException('Failed to generate token', 500);
		});

		return token;
	}
}
