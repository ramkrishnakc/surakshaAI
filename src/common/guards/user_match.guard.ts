import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRequest } from '../types';
import { Types } from 'mongoose';

import { METADATA_KEYS } from '../constants';
import { isAdmin } from '../utils';
import { UserRoles } from '../constants/enums';

@Injectable()
export class UserMatchGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IRequest>();
    const allowAdmin = this.reflector.get<boolean>(METADATA_KEYS.ALLOW_ADMIN, context.getHandler());

    if (allowAdmin && isAdmin(request?.user?.role as unknown as UserRoles)) return true;

    const userIdFromToken = request.user.id; // Get user id from token
    const userIdFromParams = (request.params as unknown as { id: Types.ObjectId })?.id; // Get 'id' from the request params

    if (userIdFromToken && userIdFromToken === userIdFromParams) {
      return true; // IDs match - access granted
    } else {
      throw new ForbiddenException('User ID in token does not match user ID in request params');
    }
  }
}
