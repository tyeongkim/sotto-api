import packageJson from '@/../package.json';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import initSwagger from './config/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });

	const configService = app.get(ConfigService);
	const logger = new Logger('bootstrap');

	app.use(json({ limit: '10mb' }));
	app.use(urlencoded({ limit: '10mb', extended: true }));
	app.useGlobalFilters(new GlobalExceptionFilter());
	app.useGlobalInterceptors(new TransformInterceptor());
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);
	app.getHttpAdapter().getInstance().disable('x-powered-by');

	await initSwagger(app);

	await app.listen(3000, '0.0.0.0');

	logger.log(
		`Application version ${packageJson.version} is running on: ${await app.getUrl()}`,
	);
	logger.debug(`Environment: ${configService.get('NODE_ENV')}`);
}

bootstrap();
