import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../constants/enums';
import { IRequest } from '../types';
import { METADATA_KEYS } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRoles[]>(METADATA_KEYS.ROLES, context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest<IRequest>();
    if (roles.includes(request?.user?.role as UserRoles)) {
      return true;
    } else {
      throw new ForbiddenException("User doesn't have access to the requested resource");
    }
  }
}
