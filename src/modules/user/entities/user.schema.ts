import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { EMAIL_REGEXP, USERNAME_REGEXP } from 'src/common/constants';
import { UserRoles } from 'src/common/constants/enums';
import { MSG } from 'src/common/constants/messages';
import { validateEmail } from 'src/common/utils';

@Schema({ timestamps: true })
export class User {
  // username
  @Prop({
    required: [true, MSG.isRequired('Username')],
    index: {
      unique: true,
      partialFilterExpression: { isActive: true },
    },
    match: [USERNAME_REGEXP, MSG.invalid('Username')],
    trim: true,
  })
  username: string;

  // user email address
  @Prop({
    required: [true, MSG.isRequired('Email')],
    index: {
      unique: true,
      partialFilterExpression: { isActive: true },
    },
    validate: [validateEmail, MSG.invalid('Email')],
    match: [EMAIL_REGEXP, MSG.invalid('Email')],
    trim: true,
    lowercase: true,
  })
  email: string;

  // user phone number
  @Prop({
    required: [true, MSG.isRequired('Phone number')],
    index: {
      unique: true,
      partialFilterExpression: { isActive: true },
    },
    trim: true,
  })
  phone: string;

  // user password (hashed)
  @Prop({
    required: [true, MSG.isRequired('Pasword')],
    trim: true,
  })
  password: string;
  @Prop({
    required: [true, MSG.isRequired('Encryption Salt')],
    trim: true,
  })
  encryptionKey: string;

  // role of the user
  @Prop({
    enum: {
      values: Object.values(UserRoles),
      message: 'Invalid role',
    },
    default: UserRoles.USER,
  })
  role: string;

  // is email verified
  @Prop({ default: false })
  emailVerified?: boolean;

  // is phone number verified
  @Prop({ default: false })
  phoneVerified?: boolean;

  // is user active
  @Prop({ default: true })
  isActive?: boolean;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
