import { IsString } from 'class-validator';
import { AddUsersToSharedDiaryDto } from './add-users.dto';

export class ShareDiaryDto extends AddUsersToSharedDiaryDto {
	@IsString()
	data: string;

	@IsString()
	nonce: string;
}
