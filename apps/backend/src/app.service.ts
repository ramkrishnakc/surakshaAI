import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from './core/logger/logger.service';

@Injectable()
export class AppService {
  constructor(private readonly logger: CustomLoggerService) {}

  getHello(): string {
    this.logger.error('Request received error', undefined, 'AppController');
    return 'Hello World!';
  }
}
