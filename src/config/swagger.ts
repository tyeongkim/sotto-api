import { ResponseDto } from '@/common/dto/response.dto';
import { type INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export default async function initSwagger(app: INestApplication) {
	const configService = app.get(ConfigService);
	const logger = new Logger('SwaggerConfig');
	const isProduction = configService.get('NODE_ENV') === 'production';

	if (isProduction) {
		logger.warn('Swagger is disabled in production environment');
		return;
	}

	const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');
	const { SwaggerTheme, SwaggerThemeNameEnum } = await import('swagger-themes');

	const theme = new SwaggerTheme();
	const config = new DocumentBuilder()
		.setTitle('Sotto API')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		extraModels: [ResponseDto],
	});

	SwaggerModule.setup('docs', app, document, {
		jsonDocumentUrl: 'docs/json',
		explorer: true,
		yamlDocumentUrl: 'docs/yaml',
		customCss: theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK),
		customSiteTitle: 'Sotto API Docs',
	});

	logger.log('Swagger initialized successfully');
}
