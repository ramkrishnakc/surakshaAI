import { DOB_VALIDATION } from './index';

export const MSG = {
  alreadyInUse: (str: string) => `${str} is already in use`,
  isRequired: (str: string) => `${str} is required`,
  invalid: (str: string) => `Please provide a valid ${str}`,
  admin_exists: 'Admin user already exists',
  admin_created: 'Admin user created successfully',
  admin_creation_error: 'Error creating admin user',
  user_not_found: 'User not found',
  incorrect_old_pwd: 'Old password is incorrect',
  old_new_pwd_required: 'Old password and new password are required',
  invalid_refresh_token: 'Invalid or expired refresh token. Please log in again.',
  invalid_age: `You should be older than ${DOB_VALIDATION.MIN} years to use the app`,
};
