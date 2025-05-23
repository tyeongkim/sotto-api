import { IsString } from 'class-validator';

export class UpdateDiaryDto {
	@IsString()
	data: string;

	@IsString()
	nonce: string;
}
