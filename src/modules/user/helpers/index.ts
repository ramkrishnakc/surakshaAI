import { isValidPhoneNumber } from 'libphonenumber-js';

import { MSG } from 'src/common/constants/messages';
import * as dtos from '../dto/user.dto';
import { UserDocument } from '../entities/user.schema';
import { CountryCode } from 'src/common/constants/types';
import { validateEmail } from 'src/common/utils';

export const getUserResponse = (obj: UserDocument) => ({
  id: obj._id,
  username: obj.username,
  email: obj.email,
  phone: obj.phone,
  role: obj.role,
  emailVerified: obj.emailVerified,
  phoneVerified: obj.phoneVerified,
  status: obj.status,
  createdAt: obj.get('createdAt') as Date,
  updatedAt: obj.get('updatedAt') as Date,
});

export function validatePhoneNumber(
  data: dtos.CreateUserDto | dtos.UpdateUserDto,
  user?: UserDocument,
  isUpdate = false,
): boolean {
  if (data.phone) {
    if (!isValidPhoneNumber(data.phone, 'NP' as CountryCode)) {
      throw new Error(MSG.invalid_phn);
    }
    // return from here for 'Create' case
    if (!isUpdate) return true;
  }

  if (isUpdate) {
    if (!data.phone) throw new Error(MSG.phn_required);

    return data.phone !== user?.phone;
  }
  return true;
}

export function validateUserEmail(
  data: dtos.CreateUserDto | dtos.UpdateUserDto,
  user?: UserDocument,
  isUpdate = false,
): boolean {
  if (!data.email) throw new Error(MSG.email_required);

  if (!validateEmail(data.email)) throw new Error(MSG.invalid_email);

  if (isUpdate) return data.email !== user?.email;
  return true;
}
