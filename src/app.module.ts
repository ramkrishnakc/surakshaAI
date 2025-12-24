import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_OPTIONS, DB_URI } from './core/db/db.config';
import { UserModule } from './modules/user/user.module';
import { CustomLoggerService } from './core/logger/logger.service';
import { AuthModule } from './core/auth/auth.module';
import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { RedisModule } from './core/redis/redis.module';
import { AllExceptionsFilter } from './common/filters/exception_filter';
import { FileModule } from './core/files/file.module';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URI, DB_OPTIONS),
    RedisModule,
    UserModule,
    AuthModule,
    FileModule,
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
