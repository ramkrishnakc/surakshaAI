import { Model, Types } from 'mongoose';
import { Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'lodash';

import { User, UserDocument } from './entities/user.schema';
import { UserToken, UserTokenDocument } from './entities/user_token.schema';
import * as dto from './dto/user.dto';
import { Encryption } from 'src/core/encryption';
import { CustomLoggerService } from 'src/core/logger/logger.service';
import { MSG } from 'src/common/constants/messages';
import { UserRoles, UserUpdateCases } from 'src/common/constants/enums';
import { getUserResponse, validatePhoneNumber, validateUserEmail } from './helpers';
import { validatePassword, validateUsername } from 'src/common/utils';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
    @InjectModel(UserToken.name)
    private readonly UserTokenModel: Model<UserTokenDocument>,
    private readonly logger: CustomLoggerService,
  ) {}

  async saveUser(data: dto.CreateUserDto | dto.CreateAdminDto, role: string) {
    const { pwd: password, encKey: encryptionKey } = await Encryption.encrypt(data.password ?? '');

    const createdUser = new this.UserModel({
      ...data,
      password,
      encryptionKey,
      role,
    });
    return await createdUser.save();
  }

  // Create admin user if needed - a special case
  async onModuleInit() {
    const adminExist = await this.UserModel.exists({
      role: UserRoles.ADMIN,
    }).exec();

    if (adminExist) return this.logger.log(MSG.admin_exists);

    try {
      const data = JSON.parse(process.env.ADMIN_USER || '{}') as dto.CreateAdminDto;
      await this.saveUser(data, UserRoles.ADMIN);
      this.logger.log(MSG.admin_created);
    } catch (e) {
      this.logger.error(MSG.admin_creation_error, e as Error);
    }
  }

  // Create user
  async createUser(data: dto.CreateUserDto): Promise<dto.UserResponseDto> {
    if (!validateUsername(data.username)) throw new Error(MSG.invalid('Username'));

    if (!validatePassword(data.password)) throw new Error(MSG.invalid('Password'));

    validateUserEmail(data);
    validatePhoneNumber(data);

    const result = await this.saveUser(data, data.role || UserRoles.USER);
    return getUserResponse(result);
  }

  async prepareUpdateData(
    user: UserDocument,
    data: dto.UpdateUserDto,
  ): Promise<Partial<UserDocument>> {
    const newData: Partial<UserDocument> = {};

    switch (data.updateUseCase) {
      case UserUpdateCases.PWD: {
        if (!data.oldPassword || !data.newPassword) throw new Error(MSG.old_new_pwd_required);

        if (!validatePassword(data.newPassword)) throw new Error(MSG.invalid('Password'));

        const decryptedPwd = Encryption.decrypt(user.password, user.encryptionKey);
        if (decryptedPwd !== data.oldPassword) throw new Error(MSG.incorrect_old_pwd);

        const { pwd: newEncryptedPwd, encKey: newEncKey } = await Encryption.encrypt(
          data.newPassword,
        );

        newData.password = newEncryptedPwd;
        newData.encryptionKey = newEncKey;
        break;
      }

      case UserUpdateCases.EMAIL: {
        if (validateUserEmail(data, user, true)) {
          newData.email = data.email;
          newData.emailVerified = false;
        }
        break;
      }

      case UserUpdateCases.PHONE: {
        if (validatePhoneNumber(data, user, true)) {
          newData.phone = data.phone;
          newData.phoneVerified = false;
        }
        break;
      }

      default:
        throw new Error('Invalid update case');
    }
    return newData;
  }

  async update(id: Types.ObjectId, data: dto.UpdateUserDto): Promise<{ message: string }> {
    const user = await this.UserModel.findById(id).exec();
    if (!user) throw new Error(`Couldn't update: ${MSG.user_not_found}`);

    const newData: Partial<UserDocument> = await this.prepareUpdateData(user, data);
    if (!isEmpty(newData)) {
      await this.UserModel.findByIdAndUpdate(id, newData, { projection: { _id: true } }).exec();
    }
    return { message: `${data.updateUseCase} successful` };
  }

  async delete(id: Types.ObjectId): Promise<{ message: string }> {
    const result = await this.UserModel.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      {
        projection: { _id: true },
      },
    ).exec();
    if (!result) throw new Error(`Couldn't remove: ${MSG.user_not_found}`);

    // when user is removed, it should be logged out of the system
    await this.logout(id);

    return { message: 'User removed successfully' };
  }

  async login(username: string, password: string): Promise<dto.UserResponseDto> {
    const user = await this.UserModel.findOne({ username, isActive: true }).exec();
    if (!user) throw new Error(MSG.user_not_found);

    const decryptedPwd = Encryption.decrypt(user.password, user.encryptionKey);
    if (decryptedPwd !== password) {
      throw new UnauthorizedException(MSG.invalid('username & password'));
    }

    return getUserResponse(user);
  }

  async saveRefreshToken(
    userId: Types.ObjectId,
    refreshToken: string,
  ): Promise<UserTokenDocument | null> {
    return await this.UserTokenModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { refreshToken, lastLoginAt: new Date() },
      { upsert: true, projection: { _id: true } },
    ).exec();
  }

  async checkRefreshToken(
    userId: Types.ObjectId,
    refreshToken: string,
  ): Promise<dto.UserResponseDto> {
    const tokenInfo = await this.UserTokenModel.findOne(
      {
        userId: new Types.ObjectId(userId),
        refreshToken,
      },
      {
        _id: true,
      },
    ).exec();
    if (!tokenInfo) {
      throw new UnauthorizedException('Invalid refresh token. Authentication required.');
    }

    const user = await this.UserModel.findById(userId).exec();
    if (!user) throw new Error(MSG.user_not_found);

    return getUserResponse(user);
  }

  async logout(userId: Types.ObjectId) {
    return await this.UserTokenModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { refreshToken: '', lastLogoutAt: new Date() },
      { projection: { _id: true } },
    ).exec();
  }
}
