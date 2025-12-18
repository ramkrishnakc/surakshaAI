import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../constants/enums';
import { IRequest } from '../types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRoles[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest<IRequest>();
    return roles.includes(request?.user?.role as UserRoles);
  }
}
