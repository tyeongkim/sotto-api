import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getUser(uuid: string) {
		return this.prisma.user.findUnique({
			where: { uuid },
		});
	}

	async getUserHasToken(token: string) {
		return this.prisma.user.findFirst({
			where: {
				accessToken: {
					has: token,
				},
			},
		});
	}

	async addAccessToken(uuid: string, token: string) {
		return this.prisma.user.update({
			where: { uuid },
			data: {
				accessToken: {
					push: token,
				},
			},
		});
	}
}
