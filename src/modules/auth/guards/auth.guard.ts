import { AuthorizedRequest } from '@/types/request';
import {
	CanActivate,
	ExecutionContext,
	HttpException,
	Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest<AuthorizedRequest>();
		const header = request.headers.authorization || '';
		const token = header?.split(' ')[1];

		if (!token) {
			throw new HttpException('Token not found', 401);
		}

		const account = await this.authService.validateToken(token);
		request.account = account;

		return true;
	}
}
