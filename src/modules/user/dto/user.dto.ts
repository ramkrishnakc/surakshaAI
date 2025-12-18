import { Types } from 'mongoose';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsBoolean, IsDate } from 'class-validator';
import { UserRoles, UserUpdateCases } from 'src/common/constants/enums';

class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class CreateUserDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum([UserRoles.USER, UserRoles.AUTHORITY])
  readonly role: string;
}

export class CreateAdminDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum([UserRoles.ADMIN])
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  @IsBoolean()
  readonly emailVerified: true;

  @IsString()
  @IsNotEmpty()
  @IsBoolean()
  readonly phoneVerified: true;
}

export class UpdateUserDto {
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  readonly email?: string;

  @IsOptional()
  readonly phone?: string;

  @IsOptional()
  readonly internationalFormat?: string;

  @IsOptional()
  readonly countryCode?: string;

  @IsOptional()
  readonly dateOfBirth?: Date;

  @IsOptional()
  readonly oldPassword?: string;

  @IsOptional()
  readonly newPassword?: string;

  @IsNotEmpty()
  @IsEnum(UserUpdateCases)
  readonly updateUseCase: UserUpdateCases;
}

export class UserResponseDto {
  @IsString()
  @IsNotEmpty()
  readonly id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsDate()
  @IsOptional()
  readonly createdAt?: Date;

  @IsDate()
  @IsOptional()
  readonly updatedAt?: Date;

  @IsBoolean()
  @IsOptional()
  readonly emailVerified?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly phoneVerified?: boolean;

  @IsDate()
  @IsOptional()
  readonly lastLoginAt?: Date;

  @IsString()
  @IsOptional()
  readonly status?: string;
}
