import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ShareDiaryTargetDto } from './shared-diary-target.dto';

export class AddUsersToSharedDiaryDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ShareDiaryTargetDto)
	targets: Array<ShareDiaryTargetDto>;
}
