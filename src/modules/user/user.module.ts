import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './entities/user.schema';
import { UserInfo, UserInfoSchema } from './entities/userinfo.schema';
import { UserToken, UserTokenSchema } from './entities/usertoken.schema';
import { LoggerModule } from 'src/core/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserInfo.name, schema: UserInfoSchema },
      { name: UserToken.name, schema: UserTokenSchema },
    ]),
    LoggerModule,
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
