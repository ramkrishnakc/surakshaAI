import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import path from 'node:path';
import { MulterModule } from '@nestjs/platform-express';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './entities/user.schema';
import { UserInfo, UserInfoSchema } from './entities/user_info.schema';
import { UserToken, UserTokenSchema } from './entities/user_token.schema';
import { LoggerModule } from 'src/core/logger/logger.module';
import { UserInfoService } from './user_info.service';
import { GetUploadConfig, FileUploadArgs } from 'src/core/multer/multer.config';
import { FileModule } from 'src/core/files/file.module';

const args: FileUploadArgs = {
  fileSize: 1 * 1024 * 1024, // 1MB
  destination: path.join(process.env.UPLOAD_PATH || ''), // folder path
  exts: ['jpg', 'jpeg', 'png'], // Allowed file extensions
  useFieldAsFilename: true,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserInfo.name, schema: UserInfoSchema },
      { name: UserToken.name, schema: UserTokenSchema },
    ]),
    LoggerModule,
    MulterModule.register(GetUploadConfig(args)),
    FileModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, UserInfoService],
})
export class UserModule {}
