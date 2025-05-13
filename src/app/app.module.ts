import { AuthModule } from '@/modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', '.env.local', '.env.development'],
		}),
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
