import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
	private client: Client;
	private bucketName: string;

	constructor(private readonly configService: ConfigService) {}

	async onModuleInit() {
		this.client = new Client({
			endPoint:
				this.configService.get<string>('MINIO_ENDPOINT') || 'play.min.io',
			accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
			secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
			useSSL: true,
		});

		this.bucketName =
			this.configService.get<string>('MINIO_BUCKET_NAME') || 'default-bucket';

		if (!(await this.client.bucketExists(this.bucketName))) {
			throw new Error(
				`Bucket ${this.bucketName} does not exist. Please create it before using the Minio service.`,
			);
		}
	}

	getClient() {
		return this.client;
	}

	async getUploadPresignedUrl(fileName: string) {
		return this.client.presignedPutObject(this.bucketName, fileName, 60 * 60);
	}

	async getObjectUrl(fileName: string) {
		return this.client.presignedGetObject(this.bucketName, fileName);
	}
}
