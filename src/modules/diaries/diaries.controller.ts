import { AuthorizedRequest } from '@/types/request';
import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../users/guards/auth.guard';
import { DiariesService } from './diaries.service';
import { AddUsersToSharedDiaryDto } from './dto/add-users.dto';
import { ShareDiaryDto } from './dto/share-diary.dto';
import { DiariesRepository } from './repositories/diaries.repository';

@Controller('diaries')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class DiariesController {
	constructor(
		private readonly diariesService: DiariesService,
		private readonly diariesRepository: DiariesRepository,
	) {}

	@Post('')
	async shareDiary(@Req() req: AuthorizedRequest, @Body() body: ShareDiaryDto) {
		return this.diariesService.createDiary(
			req.user.uuid,
			body.data,
			body.nonce,
		);
	}

	@Get('shared')
	async getSharedDiaries(@Req() req: AuthorizedRequest) {
		return this.diariesRepository.getSharedDiaries(req.user.uuid);
	}

	@Patch('shared/:uuid/users')
	async addUserToSharedDiary(
		@Body() body: AddUsersToSharedDiaryDto,
		@Param('uuid') diaryUUID: string,
	) {
		return this.diariesService.addUsersToSharedDiary(diaryUUID, body.targets);
	}
}
