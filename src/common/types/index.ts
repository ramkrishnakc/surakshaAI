import { Request } from 'express';
import { AccessTokenPayloadDto } from 'src/core/auth/auth.dto';

export interface IRequest<
  TParams = Record<string, string>,
  TBody = any,
  TQuery = any,
> extends Request<TParams, unknown, TBody, TQuery> {
  user: AccessTokenPayloadDto;
}
