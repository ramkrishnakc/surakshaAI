import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import * as dto from './auth.dto';
import { RedisService } from '../redis/redis.service';
import { REDIS_KEYS, REDIS_TTL } from '../redis/redis.constants';
import { CustomLoggerService } from '../logger/logger.service';
import { LOG_CTXT } from 'src/common/constants';
import { UserRoles } from 'src/common/constants/enums';
import { UserResponseDto } from 'src/modules/user/dto/user.dto';

const ctxt = LOG_CTXT.AUTH;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly redis: RedisService,
    private readonly logger: CustomLoggerService,
  ) {}

  async generateTokens(payload: dto.AccessTokenPayloadDto): Promise<dto.TokenResponseDto> {
    // Generate Access & Refresh Tokens
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload, {
        algorithm: 'HS256',
        secret: process.env.ACCESS_SECRET,
        expiresIn: '5m',
      }),
      this.jwt.signAsync(
        {
          id: payload.id,
          role: payload.role,
          username: payload.username,
        },
        {
          algorithm: 'HS256',
          secret: process.env.REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    // Save the refresh token in your database.
    await this.userService.saveRefreshToken(payload.id, refreshToken);
    // Cache the access token in cache manager
    await this.redis.set(
      `${REDIS_KEYS.usertoken}:${payload.id as unknown as string}`,
      accessToken,
      REDIS_TTL.ACCESS_TOKEN,
    );
    return { accessToken, refreshToken };
  }

  async refreshToken(token: string): Promise<dto.TokenResponseDto> {
    // Verify the refresh token's signature and expiry (using JwtService)
    let payload: dto.RefreshTokenPayloadDto;
    try {
      payload = this.jwt.verify(token, { secret: process.env.REFRESH_SECRET });
    } catch {
      // If verification fails (e.g., token expired or invalid signature)
      throw new UnauthorizedException('Invalid or expired refresh token. Please log in again.');
    }

    // Validate the user & it's refresh token in database
    const user = await this.userService.checkRefreshToken(payload.id, token);
    this.logger.log(`Token refreshed. User: '${user.username}', Role: '${user.role}'`, ctxt);
    return await this.generateTokens(user);
  }

  async login(data: dto.LoginDto): Promise<dto.TokenResponseDto> {
    const user = await this.userService.login(data.username, data.password);
    if (!user) throw new UnauthorizedException();

    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      status: user.status,
    };

    this.logger.log(`Login successful. User: '${data.username}', Role: '${user.role}'`, ctxt);
    return await this.generateTokens(payload);
  }

  async logout(data: dto.AccessTokenPayloadDto): Promise<{ message: string }> {
    await Promise.all([
      // Clear refresh-token from DB
      this.userService.logout(data.id),
      // Clear access token from the cache manager
      this.redis.delete(`${REDIS_KEYS.usertoken}:${data.id as unknown as string}`),
    ]);
    this.logger.log(`Logout successful. User: '${data.username}', Role: '${data.role}'`, ctxt);
    return { message: 'Logout successful!' };
  }

  async signup(data: dto.SignupDto): Promise<UserResponseDto> {
    return await this.userService.createUser({
      ...data,
      role: UserRoles.USER as unknown as string,
    });
  }
}
