import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
	private readonly logger = new Logger('HTTP');

	use(req: Request, res: Response, next: NextFunction): void {
		const { method, originalUrl } = req;
		const ip = (req.ip || req.socket?.remoteAddress || '').toString();
		const userAgent = req.get('user-agent') || '';

		const start = process.hrtime.bigint();

		res.on('finish', () => {
			const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
			const { statusCode } = res;
			const contentLength = res.get('content-length') || '0';

			this.logger.log(
				`${ip} ${method} ${originalUrl} ${statusCode} ${contentLength} - ${durationMs.toFixed(1)}ms "${userAgent}"`,
			);
		});

		next();
	}
}
