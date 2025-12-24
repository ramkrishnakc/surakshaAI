export enum UserRoles {
  ADMIN = 'admin', // highest level of access
  AUTHORITY = 'authority', // government or organizational authority
  USER = 'user', // regular user
}

export enum RelationshipTypes {
  FAMILY = 'family',
  RELATIVE = 'relative',
  FRIEND = 'friend',
  COLLEAGUE = 'colleague',
  OTHER = 'other',
}

export enum VerificationStatuses {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export enum MaritalStatuses {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
}

export enum GenderTypes {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'others',
}

export enum ContactTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export enum DocumentTypes {
  CITIZENSHIP_PROOF = 'citizenship_proof',
  NATIONAL_ID_PROOF = 'national_id_proof',
  LICENSE_PROOF = 'license_proof',
  PASSPORT_PROOF = 'passport_proof',
}

export enum PhoneTypes {
  MOBILE = 'mobile',
  HOME = 'home',
  WORK = 'work',
}

export enum EmailTypes {
  PERSONAL = 'personal',
  WORK = 'work',
}

export enum TokenTypes {
  EMAIL_VERIFY = 'email_verification',
  PHN_VERIFY = 'phone_verification',
  PWD_RESET = 'password_reset',
  DOC_VERIFY = 'document_verification',
}

export enum UserUpdateCases {
  PWD = 'password_update',
  EMAIL = 'email_update',
  PHONE = 'phone_update',
  EMAIL_VERIFY = 'email_verify',
  PHN_VERIFY = 'phone_verify',
}

export enum AuthTypes {
  BASIC = 'basic',
  OAUTH = 'oauth',
}

export enum OAuthProviders {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
}

export enum AuditLogActions {
  LOGIN = 'user_login',
  LOGOUT = 'user_logout',
  DATA_ACCESS = 'data_access',
  DATA_MODIFICATION = 'data_modification',
}

export enum AuditLogStatuses {
  SUCCESS = 'success',
  FAILURE = 'failure',
}

export enum DeploymentEnvironments {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export enum LogLevels {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export enum ApiResponseStatuses {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export enum DataBackupFrequencies {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}
