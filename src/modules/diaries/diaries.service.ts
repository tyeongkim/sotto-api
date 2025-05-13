import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
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
}
