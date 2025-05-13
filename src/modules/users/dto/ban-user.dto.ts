import { IsString, IsUUID } from 'class-validator';

export class BanUserDto {
	@IsString()
	@IsUUID('4')
	uuid: string;
}
