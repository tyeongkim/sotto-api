import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

async function main() {
	for (const path of ['.env', '.env.development', '.env.local']) {
		dotenv.config({ path, override: true });
	}

	const prisma = new PrismaClient();

	await prisma.$connect();

	await prisma.user.create({
		data: {
			username: 'johndoe123',
			name: 'John Doe',
			publicKey: 'TEST_PUBLIC_KEY',
			accessToken: '1234',
		},
	});

	await prisma.$disconnect();
}

main().catch((e) => {
	if (e instanceof Error) {
		console.error(e.name);
		console.error(e.message);
	}
});
