import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiariesRepository {
	constructor(private readonly prisma: PrismaService) {}

	getDiary(uuid: string) {
		return this.prisma.diary.findUnique({
			where: { uuid },
			include: {
				owner: {
					omit: {
						accessToken: true,
						bannedUsers: true,
					},
				},
			},
		});
	}

	createDiary(ownerUUID: string, data: string, nonce: string) {
		return this.prisma.diary.create({
			data: {
				data,
				nonce,
				owner: {
					connect: { uuid: ownerUUID },
				},
			},
		});
	}

	updateDiary(uuid: string, data: string, nonce: string) {
		return this.prisma.diary.update({
			where: { uuid },
			data: {
				data,
				nonce,
			},
		});
	}

	deleteDiary(uuid: string) {
		return this.prisma.diary.delete({
			where: { uuid },
		});
	}

	async getSharedDiaries(userUUID: string) {
		const user = await this.prisma.user.findUnique({
			where: { uuid: userUUID },
			include: {
				sharedDiaries: {
					include: {
						diary: {
							include: {
								owner: {
									omit: {
										accessToken: true,
										bannedUsers: true,
									},
								},
							},
						},
						recipient: {
							omit: {
								accessToken: true,
								bannedUsers: true,
							},
						},
					},
				},
			},
		});
		return (
			user?.sharedDiaries?.filter(
				(sharedDiary) => !user.bannedUsers.includes(sharedDiary.diary.ownerId),
			) || []
		);
	}

	createSharedDiary(
		diaryUUID: string,
		recipientUUID: string,
		encryptedKey: string,
	) {
		const result = this.prisma.sharedDiary.create({
			data: {
				diary: {
					connect: { uuid: diaryUUID },
				},
				recipient: {
					connect: { uuid: recipientUUID },
				},
				encryptedKey,
			},
		});
		return result;
	}

	deleteSharedDiary(diaryUUID: string, recipientUUID: string) {
		return this.prisma.sharedDiary.deleteMany({
			where: {
				diary: {
					uuid: diaryUUID,
				},
				recipient: {
					uuid: recipientUUID,
				},
			},
		});
	}
}
