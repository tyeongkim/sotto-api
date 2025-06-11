import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TOKEN_NOT_GENERATED } from '../constants';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class UsersRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getUser(uuid: string) {
		return this.prisma.user.findUnique({
			where: { uuid },
		});
	}

	async getUserByToken(token: string) {
		return this.prisma.user.findUnique({
			where: { accessToken: token },
		});
	}

	async searchUsersByUsername(username: string, excludeUUID?: string) {
		return this.prisma.user.findMany({
			where: {
				username: {
					contains: username,
					mode: 'insensitive',
				},
				NOT: {
					uuid: excludeUUID,
				},
			},
			take: 10,
		});
	}

	async createUser(payload: SignupDto) {
		return this.prisma.user.create({
			data: {
				name: payload.name,
				username: payload.username,
				profileUrl: payload.profileUrl,
				publicKey: payload.publicKey,
				accessToken: TOKEN_NOT_GENERATED,
			},
		});
	}

	async updateUser(uuid: string, payload: Partial<SignupDto>) {
		return this.prisma.user.update({
			where: { uuid },
			data: payload,
		});
	}

	async deleteUser(uuid: string) {
		return this.prisma.user.delete({
			where: { uuid },
		});
	}

	async addAccessToken(uuid: string, token: string) {
		return this.prisma.user.update({
			where: { uuid },
			data: {
				accessToken: token,
			},
		});
	}

	async addBan(userUUID: string, targetUUID: string) {
		return this.prisma.user.update({
			where: { uuid: userUUID },
			data: {
				bannedUsers: { push: targetUUID },
			},
		});
	}
}
