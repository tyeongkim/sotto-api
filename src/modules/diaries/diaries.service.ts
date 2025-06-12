import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { HttpException, Injectable } from '@nestjs/common';
import { ShareDiaryTargetDto } from './dto/shared-diary-target.dto';
import { DiariesRepository } from './repositories/diaries.repository';

@Injectable()
export class DiariesService {
	constructor(
		private readonly diariesRepository: DiariesRepository,
		private readonly prisma: PrismaService,
	) {}

	async createDiary(ownerUUID: string, data: string, nonce: string) {
		return this.diariesRepository.createDiary(ownerUUID, data, nonce);
	}

	async updateDiary(uuid: string, data: string, nonce: string) {
		return this.diariesRepository.updateDiary(uuid, data, nonce);
	}

	async deleteDiary(uuid: string, userUUID: string) {
		if (await this.isDiaryOwner(uuid, userUUID)) {
			return this.diariesRepository.deleteDiary(uuid);
		}
		throw new HttpException('You are not the owner of this diary', 403);
	}

	async addUsersToSharedDiary(
		diaryUUID: string,
		payload: Array<ShareDiaryTargetDto>,
	) {
		return await this.prisma.$transaction(
			payload.map((user) =>
				this.diariesRepository.createSharedDiary(
					diaryUUID,
					user.uuid,
					user.encryptedKey,
				),
			),
		);
	}

	async isDiaryOwner(userUUID: string, diaryUUID: string) {
		const diary = await this.diariesRepository.getDiary(diaryUUID);
		return diary?.owner.uuid === userUUID;
	}

	async isUserInSharedDiary(userUUID: string, diaryUUID: string) {
		const sharedDiary = await this.diariesRepository.getSharedDiary(
			userUUID,
			diaryUUID,
		);
		return !!sharedDiary;
	}
}
