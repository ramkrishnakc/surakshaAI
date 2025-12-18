import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;
}

export class RefreshTokenPayloadDto {
  @IsNotEmpty()
  readonly id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}

export class AccessTokenPayloadDto extends RefreshTokenPayloadDto {
  @IsBoolean()
  readonly emailVerified?: boolean;

  @IsBoolean()
  readonly phoneVerified?: boolean;

  @IsString()
  readonly status?: string;
}

export class TokenResponseDto {
  @IsString()
  @IsNotEmpty()
  readonly accessToken: string;

  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;
}
