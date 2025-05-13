import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
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

	async createUser(payload: SignupDto) {
		return this.prisma.user.create({
			data: {
				name: payload.name,
				username: payload.username,
				profileUrl: payload.profileUrl,
				publicKey: payload.publicKey,
			},
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
}
