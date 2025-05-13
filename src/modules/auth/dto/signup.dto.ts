import { IsOptional, IsString, Matches } from 'class-validator';

export class SignupDto {
	@IsString()
	@Matches(/^[a-zA-Z\s]{1,50}$/, {
		message:
			'name must be up to 50 characters long and contain only letters and spaces',
	})
	name: string;

	@IsString()
	@Matches(/^[a-zA-Z0-9]{6,12}$/, {
		message:
			'username must be 6-12 characters long and contain only letters and numbers',
	})
	username: string;

	@IsString()
	@IsOptional()
	profileUrl?: string;

	@IsString()
	publicKey: string;
}
