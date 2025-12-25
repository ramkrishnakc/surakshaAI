import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { keys } from 'lodash';
import { MongoServerError } from 'mongodb';

import { MSG } from '../constants/messages';
import { CustomLoggerService } from 'src/core/logger/logger.service';
import { LOG_CTXT } from '../constants';
import { IRequest } from '../types';

@Catch(Error)
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: CustomLoggerService;

  constructor() {
    this.logger = new CustomLoggerService();
  }

  public catch(e: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest();
    const res: Response = ctx.getResponse();

    if (e instanceof MongoServerError) {
      // Check for specific error codes
      switch (e.code) {
        case 11000: {
          // Handle a duplicate key error (E11000)
          const k = keys(e.keyPattern || {})?.[0];
          const msg = k
            ? MSG.alreadyInUse(k.toUpperCase())
            : 'Duplicate document. Please check your input';

          return res.status(400).json(new BadRequestException(msg).getResponse());
        }
        case 8000:
          // Handle a space quota exceeded error (AtlasError)
          return res
            .status(507)
            .json({ message: 'MongoDB space quota exceeded. Please upgrade your Atlas tier.' });
        case 18:
          // Handle an authentication failure error
          return res
            .status(401)
            .json(
              new UnauthorizedException(
                'MongoDB Authentication failed. Check credentials.',
              ).getResponse(),
            );
        default:
          // Handle other specific MongoServerErrors
          return res
            .status(500)
            .json(
              new InternalServerErrorException(`MongoDB Server Error: ${e.message}`).getResponse(),
            );
      }
    }

    const msg = JSON.stringify({
      message: e.message,
      method: req?.method,
      url: req?.url,
      ip: req?.ip,
      username: (req as unknown as IRequest)?.user?.username,
      role: (req as unknown as IRequest)?.user?.role,
    });

    if (e instanceof HttpException) {
      this.logger.error(msg, e, LOG_CTXT.HTTP_ERR);
      res.status(e.getStatus()).json(e.getResponse());
    } else {
      this.logger.error(msg, e, LOG_CTXT.UNEXPECTED_ERR);
      res.status(400).json(new BadRequestException(e.message).getResponse());
    }
  }
}
