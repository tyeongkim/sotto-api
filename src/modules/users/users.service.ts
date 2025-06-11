import { generateRandomString } from '@/common/utils/common.util';
import { HttpException, Injectable } from '@nestjs/common';
import { TOKEN_NOT_GENERATED } from './constants';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
	constructor(private readonly authRepository: UsersRepository) {}

	async getSafeUserData(accountUUID: string) {
		const account = await this.authRepository.getUser(accountUUID);
		if (!account) {
			throw new HttpException('Account not found', 404);
		}
		return {
			uuid: account.uuid,
			name: account.name,
			username: account.username,
			profileUrl: account.profileUrl,
			publicKey: account.publicKey,
			createdAt: account.createdAt,
			updatedAt: account.updatedAt,
		};
	}

	async validateToken(token: string) {
		const account = await this.authRepository.getUserByToken(token);
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
		if (account.accessToken || account.accessToken !== TOKEN_NOT_GENERATED) {
			throw new HttpException('Maximum token limit reached', 400);
		}

		const token = generateRandomString(64);

		await this.authRepository.addAccessToken(accountUUID, token).catch(() => {
			throw new HttpException('Failed to generate token', 500);
		});

		return token;
	}
}
