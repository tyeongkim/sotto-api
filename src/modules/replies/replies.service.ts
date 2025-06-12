import { HttpException, Injectable } from '@nestjs/common';
import { DiariesService } from '../diaries/diaries.service';
import { UsersRepository } from '../users/repositories/users.repository';
import { CreateReplyDto } from './dto/create-reply.dto';
import { RepliesRepository } from './repositories/replies.repository';

@Injectable()
export class RepliesService {
	constructor(
		private readonly repliesRepository: RepliesRepository,
		private readonly diariesService: DiariesService,
		private readonly usersRepository: UsersRepository,
	) {}

	async getReplies(userId: string, diaryId: string) {
		const isOwner = await this.diariesService.isDiaryOwner(userId, diaryId);
		if (!isOwner) {
			throw new HttpException('You are not the owner of this diary', 403);
		}
		const replies = await this.repliesRepository.getReplies(diaryId);
		const user = await this.usersRepository.getUser(userId);
		return replies.filter(
			(reply) => !user?.bannedUsers.includes(reply.author.uuid),
		);
	}

	async createReply(userId: string, payload: CreateReplyDto) {
		const isInShared = await this.diariesService.isUserInSharedDiary(
			userId,
			payload.diaryId,
		);
		if (!isInShared) {
			throw new HttpException('You are not in this shared diary', 403);
		}
		return this.repliesRepository.createReply(userId, payload);
	}

	async deleteReply(userId: string, replyId: string) {
		const reply = await this.repliesRepository.getReply(replyId);
		if (!reply) {
			throw new HttpException('Reply not found', 404);
		}

		const isAuthor = await this.isReplyAuthor(userId, replyId);
		const isDiaryOwner = await this.diariesService.isDiaryOwner(
			userId,
			reply.diaryId,
		);
		if (!isAuthor && !isDiaryOwner) {
			throw new HttpException(
				'You do not have permission to delete this reply',
				403,
			);
		}
		return this.repliesRepository.deleteReply(replyId);
	}

	async isReplyAuthor(userId: string, replyId: string) {
		const reply = await this.repliesRepository.getReply(replyId);
		if (!reply) {
			throw new HttpException('Reply not found', 404);
		}
		return reply.author.uuid === userId;
	}
}
