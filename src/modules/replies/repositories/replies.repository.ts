import { PrismaService } from '@/common/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateReplyDto } from '../dto/create-reply.dto';

@Injectable()
export class RepliesRepository {
	constructor(private readonly prismaService: PrismaService) {}

	getReplies(diaryId: string) {
		return this.prismaService.reply.findMany({
			where: { diaryId },
			include: {
				author: {
					select: { uuid: true, name: true, username: true, profileUrl: true },
				},
			},
			orderBy: { createdAt: 'desc' },
		});
	}

	getReply(replyId: string) {
		return this.prismaService.reply.findUnique({
			where: { uuid: replyId },
			include: {
				author: {
					select: { uuid: true, name: true, username: true, profileUrl: true },
				},
			},
		});
	}

	createReply(authorId: string, payload: CreateReplyDto) {
		return this.prismaService.reply.create({
			data: {
				data: payload.data,
				nonce: payload.nonce,
				encryptedKey: payload.encryptedKey,
				author: {
					connect: { uuid: authorId },
				},
				diary: {
					connect: { uuid: payload.diaryId },
				},
			},
		});
	}

	deleteReply(replyId: string) {
		return this.prismaService.reply.delete({
			where: { uuid: replyId },
		});
	}
}
