import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateMeDto {
	@IsOptional()
	@IsString()
	@Length(1, 50, { message: 'name must be between 1 and 50 characters long' })
	@Matches(/^[a-zA-Z\s]+$/, {
		message: 'name can only contain letters and spaces',
	})
	@ApiProperty({
		description: 'Name of the user',
		example: 'John Doe',
		required: false,
	})
	name?: string;

	@IsString()
	@IsOptional()
	@ApiPropertyOptional({
		description: 'Profile URL of the user',
	})
	profileUrl?: string;
}
