import { ResponseDto } from '@/common/dto/response.dto';
import {
	type CallHandler,
	type ExecutionContext,
	HttpStatus,
	Injectable,
	type NestInterceptor,
} from '@nestjs/common';
import type { Response } from 'express';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
		const response = context.switchToHttp().getResponse<Response>();

		return next.handle().pipe(
			map((data) => {
				const apiResponse = new ResponseDto();

				apiResponse.status = response.statusCode || HttpStatus.OK;

				apiResponse.data = data;

				response.status(HttpStatus.OK).send(apiResponse);
			}),
		);
	}
}
