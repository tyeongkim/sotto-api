import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class SignupDto {
	@IsString()
	@Length(1, 50, { message: 'name must be between 1 and 50 characters long' })
	@Matches(/^[a-zA-Z\s]+$/, {
		message: 'name can only contain letters and spaces',
	})
	@ApiProperty({
		description: 'Name of the user',
		example: 'John Doe',
	})
	name: string;

	@IsString()
	@Length(6, 24, {
		message: 'username must be between 6 and 24 characters long',
	})
	@Matches(/^[a-zA-Z0-9.]+$/, {
		message: 'username must contain only letters, numbers, and dots',
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
