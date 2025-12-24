import { isValidPhoneNumber } from 'libphonenumber-js';
import { pick, get } from 'lodash';

import { MSG } from 'src/common/constants/messages';
import * as dtos from '../dto/user.dto';
import { UserDocument } from '../entities/user.schema';
import { CountryCode } from 'src/common/constants/types';
import { validateEmail } from 'src/common/utils';
import { DOB_VALIDATION } from 'src/common/constants';
import { UserInfoDocument } from '../entities/user_info.schema';

export const getUserResponse = (obj: UserDocument) => ({
  id: obj._id,
  username: obj.username,
  email: obj.email,
  phone: obj.phone,
  role: obj.role,
  emailVerified: obj.emailVerified,
  phoneVerified: obj.phoneVerified,
  isActive: obj.isActive,
  createdAt: obj.get('createdAt') as Date,
  updatedAt: obj.get('updatedAt') as Date,
});

const userInfoKeys = [
  'fullname',
  'dateOfBirth',
  'gender',
  'maritalStatus',
  'permanentAddress',
  'temporaryAddress',
  'isSameAddress',
  'emergencyContacts',
  'medicalInfo',
  'occupation',
  'govtDocs',
  'imageUrl',
];
export const getUserInfoResponse = (obj: UserInfoDocument) => ({
  id: get(obj, 'userId._id'),
  username: get(obj, 'userId.username'),
  email: get(obj, 'userId.email'),
  phone: get(obj, 'userId.phone'),
  role: get(obj, 'userId.role'),
  emailVerified: get(obj, 'userId.emailVerified'),
  phoneVerified: get(obj, 'userId.phoneVerified'),
  isActive: get(obj, 'userId.isActive'),
  createdAt: get(obj, 'userId.createdAt'),
  updatedAt: get(obj, 'updatedAt'),
  ...pick(obj, userInfoKeys),
});

export function validatePhoneNumber(
  data: dtos.CreateUserDto | dtos.UpdateUserDto,
  user?: UserDocument,
  isUpdate = false,
): boolean {
  if (!data.phone || !isValidPhoneNumber(data.phone, 'NP' as CountryCode)) {
    throw new Error(MSG.invalid('Phone number'));
  }
  return isUpdate ? data.phone !== user?.phone : true;
}

export function validateUserEmail(
  data: dtos.CreateUserDto | dtos.UpdateUserDto,
  user?: UserDocument,
  isUpdate = false,
): boolean {
  if (!data.email || !validateEmail(data.email)) throw new Error(MSG.invalid('Email'));
  return isUpdate ? data.email !== user?.email : true;
}

export function validateDOB(d: Date) {
  const today = new Date();
  const birthDate = new Date(d);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birth date hasn't occurred this year yet
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age >= DOB_VALIDATION.MIN && age < DOB_VALIDATION.MAX) {
    return true; // Valid age
  }
  throw new Error(MSG.invalid_age);
}
