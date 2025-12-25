import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  providers: [FileService],
  exports: [FileService],
  imports: [LoggerModule],
})
export class FileModule {}
