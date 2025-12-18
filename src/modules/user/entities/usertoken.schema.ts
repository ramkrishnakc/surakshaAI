import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: false })
export class UserToken {
  // reference to User collection
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  // last login date to the app
  @Prop({ trim: true })
  lastLoginAt: Date;

  // last logout date to the app
  @Prop({ trim: true })
  lastLogoutAt?: Date;

  /*
    - refresh token is valid for 7 days
    - or until it is used once to refresh the auth token
    - or until user logs out of the application
    - or until it is revoked
  */
  @Prop({ trim: true })
  refreshToken?: string;
}

export type UserTokenDocument = HydratedDocument<UserToken>;
export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
