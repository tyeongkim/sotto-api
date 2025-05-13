import {
	type ArgumentsHost,
	BadRequestException,
	Catch,
	type ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { ResponseDto } from '../dto/response.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(GlobalExceptionFilter.name);
	private readonly configService = new ConfigService();

	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const message = exception.message || 'Internal Server Error';
		const apiResponse = new ResponseDto();

		apiResponse.status = status;

		if (exception instanceof BadRequestException) {
			const exceptionResponse = exception.getResponse() as {
				message: Array<string> | string;
			};

			const messages =
				typeof exceptionResponse.message === 'string'
					? [exceptionResponse.message]
					: exceptionResponse.message;

			apiResponse.message = messages.join(', ');
		} else {
			apiResponse.message = message;
		}

		response.status(status).send(apiResponse);

		const isDevelopment = this.configService.get('NODE_ENV') !== 'production';
		this.logger.error(
			`${exception.name} - ${exception.message}`,
			isDevelopment && apiResponse.status === HttpStatus.INTERNAL_SERVER_ERROR
				? exception.stack
				: undefined,
		);
	}
}
