import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';

@Catch(Error)
export class AllExceptionsFilter implements ExceptionFilter {
  public catch(e: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();

    if (e instanceof MongoServerError) {
      // Check for specific error codes
      switch (e.code) {
        case 11000:
          // Handle a duplicate key error (E11000)
          return res
            .status(400)
            .json(
              new BadRequestException('Duplicate document. Please check your input').getResponse(),
            );
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

    if (e instanceof HttpException) {
      res.status(e.getStatus()).json(e.getResponse());
    } else {
      res.status(400).json(new BadRequestException(e.message).getResponse());
    }
  }
}
