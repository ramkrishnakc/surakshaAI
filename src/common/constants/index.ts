export const LOG_CTXT = {
  APP: 'APP',
  AUTH: 'AUTH',
  FILE: 'FILE',
  HTTP_ERR: 'HTTP_ERR',
  REDIS: 'REDIS',
  UNEXPECTED_ERR: 'UNEXPECTED_ERR',
};

export const METADATA_KEYS = {
  ROLES: 'roles',
  IS_PUBLIC: 'isPublic',
  ALLOW_ADMIN: 'allowAdmin',
};

// These are the exact keys used for uploading files
export const FILE_UPLOAD_KEYS = {
  PROFILE: 'profile',
  CITIZENSHIP: 'citizenship_proof',
  NATIONAL_ID: 'national_id_proof',
  LICENSE: 'license_proof',
  PASSPORT: 'passport_proof',
};

// eslint-disable-next-line no-useless-escape
export const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // nosonarjs
// 8 to 15 chars long with at least one number, at least one capital letter, at least one special character
export const PASS_REGEXP = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,16}$/;
// 5 to 12 chars long with numbers, alphabets and '_' or '@' only
export const USERNAME_REGEXP =
  /^[a-zA-Z](?=(?:[^0-9]*[0-9]){0,2}[^0-9]*$)(?=(?:[^_@]*[_@]){0,1}[^_@]*$)[a-zA-Z0-9@_]{4,11}$/; // nosonarjs
// 6 to 150 chars with alphabet & space only
export const FULLNAME_REGEXP = /^[a-zA-Z ]{6,150}$/;

export const SERVER_PORT = 3000;
export const API_PREFIX = 'api/v1';
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const PASSWORD_RESET_TOKEN_EXPIRATION_MS = 60 * 60 * 1000; // 1 hour
export const EMAIL_VERIFICATION_TOKEN_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours
export const SMTP_CONFIG = {
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: '',
    pass: '',
  },
};
export const DEFAULT_FROM_EMAIL = '';
export const LOG_LEVEL = 'info';
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100; // max requests per window per IP
export const CORS_ALLOWED_ORIGINS = ['http://localhost:3000'];
export const TOKEN_TYPE = {
  ACCESS: 'access',
  REFRESH: 'refresh',
};
export const TOKEN_EXPIRATION = {
  ACCESS: '1h',
  REFRESH: '7d',
};
export const DOB_VALIDATION = {
  MIN: 16,
  MAX: 90,
};
