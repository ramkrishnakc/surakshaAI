import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { EMAIL_REGEXP } from 'src/common/constants';
import { RelationshipTypes } from 'src/common/constants/enums';
import { MSG } from 'src/common/constants/messages';
import { validateEmail } from 'src/common/utils';
import { ContactInfo } from './phone';

@Schema({ _id: false })
export class EmergencyContact {
  @Prop({ required: [true, MSG.isRequired('Full Name of emergency contact')], trim: true })
  fullName: string;

  @Prop({
    enum: {
      values: Object.values(RelationshipTypes),
      message: 'Invalid relationship type',
    },
    default: RelationshipTypes.FAMILY,
    trim: true,
  })
  relation: string;

  @Prop({
    type: [ContactInfo],
    required: [true, MSG.isRequired('At least one phone number for emergency contact')],
  })
  phoneNumbers: string[];

  @Prop({
    trim: true,
    lowercase: true,
    validate: [validateEmail, MSG.invalid_email],
    match: [EMAIL_REGEXP, MSG.invalid_email],
  })
  email?: string;

  @Prop({ trim: true })
  address?: string;
}

export type EmergencyContactDocument = HydratedDocument<EmergencyContact>;
export const EmergencyContactSchema = SchemaFactory.createForClass(EmergencyContact);
