import { SetMetadata } from '@nestjs/common';
import { METADATA_KEYS } from '../constants';

export const AllowAdmin = () => SetMetadata(METADATA_KEYS.ALLOW_ADMIN, true);
