import { IsString, IsUUID } from 'class-validator';

export class ShareDiaryTargetDto {
	@IsString()
	@IsUUID('4')
	uuid: string;

	@IsString()
	encryptedKey: string;
}
