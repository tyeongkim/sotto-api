import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ShareDiaryTargetDto } from './shared-diary-target.dto';

export class AddUsersToSharedDiaryDto {
	@IsArray()
	@ArrayNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => ShareDiaryTargetDto)
	targets: Array<ShareDiaryTargetDto>;
}
