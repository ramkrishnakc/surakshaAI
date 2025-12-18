import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../constants/enums';

export const Roles = (roles: UserRoles[]) => SetMetadata('roles', roles);
