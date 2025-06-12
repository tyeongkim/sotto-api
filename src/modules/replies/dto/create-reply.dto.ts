import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateReplyDto {
	@ApiProperty({
		description: 'UUID of the diary entry to reply to',
		example: '123e4567-e89b-12d3-a456-426614174000',
	})
	@IsUUID()
	@IsNotEmpty()
	diaryId: string;

	@ApiProperty({
		description: 'Encrypted reply data',
		example: 'U2FsdGVkX1+...',
	})
	@IsString()
	@IsNotEmpty()
	data: string;

	@ApiProperty({
		description: 'Nonce used for encryption',
		example: 'a1b2c3d4e5f6g7h8',
	})
	@IsString()
	@IsNotEmpty()
	nonce: string;

	@ApiProperty({
		description: 'Encrypted key for the reply',
		example: 'U2FsdGVkX1+...',
	})
	@IsString()
	@IsNotEmpty()
	encryptedKey: string;
}
