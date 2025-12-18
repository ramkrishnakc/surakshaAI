import dotenv from 'dotenv';
import { DeploymentEnvironments } from './common/constants/enums';

// Load environment variables as per the environment
if (process.env.NODE_ENV === DeploymentEnvironments.PRODUCTION) {
  dotenv.config();
} else {
  dotenv.config({ path: '.env.local' });
}

import * as fs from 'node:fs';
import * as http from 'node:http';
import * as https from 'node:https';
import Express from 'express';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CustomLoggerService } from './core/logger/logger.service';
import { AllExceptionsFilter } from './common/filters/exceptionFilters';

async function bootstrap() {
  const {
    HTTPS_KEY_PATH: key = '',
    HTTPS_CERT_PATH: cert = '',
    HTTP_PORT: httpPort = 3000,
    HTTPS_PORT: httpsPort = 8443,
    HOST: host = 'localhost',
  } = process.env;

  // 1. Define HTTPS options (adjust paths to your certificate files)
  const httpsOptions = { key: fs.readFileSync(key), cert: fs.readFileSync(cert) };

  // 2. Create an Express server instance
  const server = Express();
  const logger = new CustomLoggerService();

  // 3. Initialize the NestJS application with the Express adapter
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );
  // Optional: Initialize the Nest application modules
  await app.init();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // other strict options
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.use(helmet());
  app.enableCors();
  app.set('trust proxy', 'loopback'); // Trust requests from the loopback address

  app.enableShutdownHooks(); // Enable shutdown hooks

  // 4. Create and start both servers
  http
    .createServer(server)
    .listen({ host, port: httpPort }, () =>
      logger.log(`HTTP Server running on http://${host}:${httpPort}`),
    );

  https
    .createServer(httpsOptions, server)
    .listen({ host, port: httpsPort }, () =>
      logger.log(`HTTPS Server running on https://${host}:${httpsPort}`),
    );
}

bootstrap();
