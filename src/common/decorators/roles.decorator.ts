import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../constants/enums';
import { METADATA_KEYS } from '../constants';

export const Roles = (roles: UserRoles[]) => SetMetadata(METADATA_KEYS.ROLES, roles);
