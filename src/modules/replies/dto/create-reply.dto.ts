import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateReplyDto {
	@IsUUID()
	@IsNotEmpty()
	diaryId: string;

	@IsString()
	@IsNotEmpty()
	data: string;

	@IsString()
	@IsNotEmpty()
	nonce: string;

	@IsString()
	@IsNotEmpty()
	encryptedKey: string;
}
