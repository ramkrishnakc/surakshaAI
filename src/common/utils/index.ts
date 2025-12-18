import { EMAIL_REGEXP, PASS_REGEXP, USERNAME_REGEXP } from '../constants';

export const validateEmail = (d: string) => EMAIL_REGEXP.test(d);
export const validatePassword = (d: string) => PASS_REGEXP.test(d);
export const validateUsername = (d: string) => USERNAME_REGEXP.test(d);
