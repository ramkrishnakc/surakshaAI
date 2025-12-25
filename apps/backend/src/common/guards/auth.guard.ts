import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { IRequest } from '../types';
import { AccessTokenPayloadDto } from 'src/core/auth/auth.dto';
import { RedisService } from 'src/core/redis/redis.service';
import { REDIS_KEYS } from 'src/core/redis/redis.constants';
import { METADATA_KEYS } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(METADATA_KEYS.IS_PUBLIC, [
      context.getHandler(), // Check method decorator
      context.getClass(), // Check controller decorator
    ]);

    if (isPublic) return true; // Skip guard logic for public routes

    const request = context.switchToHttp().getRequest<IRequest>();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Token not found or invalid token');

    let payload: AccessTokenPayloadDto;
    try {
      payload = await this.jwt.verifyAsync(token, { secret: process.env.ACCESS_SECRET });
    } catch (e) {
      throw e instanceof TokenExpiredError
        ? new HttpException({ message: 'Token Expired' }, 498)
        : new UnauthorizedException('Invalid token');
    }

    // Check in the cache if the token is a valid one
    const validToken = await this.redis.get(
      `${REDIS_KEYS.usertoken}:${payload.id as unknown as string}`,
    );
    if (validToken !== token) {
      throw new UnauthorizedException('Invalid token for given user. Please log in again.');
    }
    request['user'] = payload;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
