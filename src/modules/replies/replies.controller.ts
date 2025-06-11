import { AuthorizedRequest } from '@/types/request';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../users/guards/auth.guard';
import { CreateReplyDto } from './dto/create-reply.dto';
import { RepliesService } from './replies.service';

@Controller('replies')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class RepliesController {
	constructor(private readonly repliesService: RepliesService) {}

	@Get()
	@ApiQuery({
		name: 'diaryId',
		required: true,
		description: 'The UUID of the diary to get replies for',
	})
	async getReplies(
		@Req() req: AuthorizedRequest,
		@Query('diaryId') diaryId: string,
	) {
		return this.repliesService.getReplies(req.user.uuid, diaryId);
	}

	@Post()
	async createReply(
		@Req() req: AuthorizedRequest,
		@Body() body: CreateReplyDto,
	) {
		return this.repliesService.createReply(req.user.uuid, body);
	}

	@Delete(':replyId')
	@ApiParam({
		name: 'replyId',
		required: true,
		description: 'The UUID of the reply to delete',
	})
	async deleteReply(
		@Req() req: AuthorizedRequest,
		@Param('replyId') replyId: string,
	) {
		return this.repliesService.deleteReply(req.user.uuid, replyId);
	}
}
