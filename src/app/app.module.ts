import { AttachmentsModule } from '@/modules/attachments/attachments.module';
import { DiariesModule } from '@/modules/diaries/diaries.module';
import { RepliesModule } from '@/modules/replies/replies.module';
import { UsersModule } from '@/modules/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', '.env.local', '.env.development'],
		}),
		UsersModule,
		DiariesModule,
		RepliesModule,
		AttachmentsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
