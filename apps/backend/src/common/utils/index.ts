import { EMAIL_REGEXP, PASS_REGEXP, USERNAME_REGEXP } from '../constants';
import { UserRoles } from '../constants/enums';

export const validateEmail = (d: string) => d && EMAIL_REGEXP.test(d);
export const validatePassword = (d: string) => d && PASS_REGEXP.test(d);
export const validateUsername = (d: string) => d && USERNAME_REGEXP.test(d);

export const isAdmin = (d: UserRoles) => d && d === UserRoles.ADMIN;
