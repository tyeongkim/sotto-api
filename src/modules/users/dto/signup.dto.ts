import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class SignupDto {
	@IsString()
	@Matches(/^[a-zA-Z\s]{1,50}$/, {
		message:
			'name must be up to 50 characters long and contain only letters and spaces',
	})
	@ApiProperty({
		description: 'Name of the user',
		example: 'John Doe',
	})
	name: string;

	@IsString()
	@Matches(/^[a-zA-Z0-9.]{6,12}$/, {
		message:
			'username must be 6-12 characters long and contain only letters, numbers, and dots',
	})
	@ApiProperty({
		description: 'Username of the user',
		example: 'john.doe123',
	})
	username: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({
		description: 'Profile URL of the user',
	})
	profileUrl?: string;

	@IsString()
	@ApiProperty({
		description: 'Public key of the user',
	})
	publicKey: string;
}
