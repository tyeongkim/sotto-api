import { AuthorizedRequest } from '@/types/request';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	Param,
	Patch,
	Post,
	Put,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../users/guards/auth.guard';
import { DiariesService } from './diaries.service';
import { AddUsersToSharedDiaryDto } from './dto/add-users.dto';
import { ShareDiaryDto } from './dto/share-diary.dto';
import { UpdateDiaryDto } from './dto/update-diary.dto';
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
		const data = await this.diariesService.createDiary(
			req.user.uuid,
			body.data,
			body.nonce,
		);
		await this.diariesService.addUsersToSharedDiary(data.uuid, body.targets);
		return data;
	}

	@Put(':uuid')
	async updateDiary(
		@Req() req: AuthorizedRequest,
		@Param('uuid') uuid: string,
		@Body() body: UpdateDiaryDto,
	) {
		if (await this.diariesService.isDiaryOwner(uuid, req.user.uuid)) {
			return this.diariesService.updateDiary(uuid, body.data, body.nonce);
		}
		throw new HttpException('You are not the owner of this diary', 403);
	}

	@Delete(':uuid')
	async deleteDiary(
		@Param('uuid') uuid: string,
		@Req() req: AuthorizedRequest,
	) {
		return this.diariesService.deleteDiary(uuid, req.user.uuid);
	}

	@Get('shared')
	async getSharedDiaries(@Req() req: AuthorizedRequest) {
		return this.diariesRepository.getSharedDiaries(req.user.uuid);
	}

	@Patch('shared/:uuid/users')
	async addUserToSharedDiary(
		@Req() req: AuthorizedRequest,
		@Body() body: AddUsersToSharedDiaryDto,
		@Param('uuid') diaryUUID: string,
	) {
		if (await this.diariesService.isDiaryOwner(diaryUUID, req.user.uuid)) {
			return this.diariesService.addUsersToSharedDiary(diaryUUID, body.targets);
		}
		throw new HttpException('You are not the owner of this diary', 403);
	}

	@Delete('shared/:diaryUUID/users/:userUUID')
	async removeUserFromSharedDiary(
		@Req() req: AuthorizedRequest,
		@Param('diaryUUID') diaryUUID: string,
		@Param('userUUID') userUUID: string,
	) {
		if (await this.diariesService.isDiaryOwner(diaryUUID, req.user.uuid)) {
			return this.diariesRepository.deleteSharedDiary(diaryUUID, userUUID);
		}
		throw new HttpException('You are not the owner of this diary', 403);
	}
}
