import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import path from 'node:path';

import { DB_OPTIONS, DB_URI } from './core/db/db.config';
import { UserModule } from './modules/user/user.module';
import { CustomLoggerService } from './core/logger/logger.service';
import { AuthModule } from './core/auth/auth.module';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { RedisModule } from './core/redis/redis.module';
import { AllExceptionsFilter } from './common/filters/exception_filter';
import { FileModule } from './core/files/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerModule } from './core/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URI, DB_OPTIONS),
    LoggerModule,
    RedisModule,
    UserModule,
    AuthModule,
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client', 'build'),
    }),
  ],
  controllers: [],
  providers: [
    CustomLoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
