import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  providers: [RedisService],
  exports: [RedisService],
  imports: [LoggerModule],
})
export class RedisModule {}
