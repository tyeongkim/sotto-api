import { UsersModule } from '@/modules/user/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', '.env.local', '.env.development'],
		}),
		UsersModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
