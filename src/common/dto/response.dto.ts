import { HttpStatus } from '@nestjs/common';

export class ResponseDto {
	public status: HttpStatus = HttpStatus.OK;

	public message = 'OK';

	public data: unknown = null;

	public responseAt: Date = new Date();
}
