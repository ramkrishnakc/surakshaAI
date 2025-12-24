import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { EMAIL_REGEXP, FULLNAME_REGEXP } from 'src/common/constants';
import { ContactTypes, RelationshipTypes } from 'src/common/constants/enums';
import { MSG } from 'src/common/constants/messages';
import { validateEmail } from 'src/common/utils';
import { ContactInfo } from './phone';
import { uniq } from 'lodash';

@Schema({ _id: false })
export class EmergencyContact {
  @Prop({
    trim: true,
    enum: {
      values: Object.values(ContactTypes),
      message: 'Invalid contact type',
    },
    required: [true, 'Emergency contact needs to one of two types: Primary or Secondary'],
    unique: true,
  })
  contactType: string;

  @Prop({
    required: [true, MSG.isRequired('Full Name of emergency contact')],
    trim: true,
    match: [FULLNAME_REGEXP, MSG.invalid('Fullname')],
    unique: true,
  })
  fullname: string;

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
    validate: {
      validator: v => {
        if (Array.isArray(v)) {
          const len = v.length;
          if (len > 0 && len <= 2 && uniq(v).length === len) return true;
        }
        return false;
      },
      message: 'At least 1 or max 2 uniq phone numbers allowed for Emergency contact',
    },
  })
  phoneNumbers: ContactInfo[];

  @Prop({
    trim: true,
    lowercase: true,
    validate: [validateEmail, MSG.invalid('Email')],
    match: [EMAIL_REGEXP, MSG.invalid('Email')],
  })
  email?: string;

  @Prop({ trim: true })
  address?: string;
}

export type EmergencyContactDocument = HydratedDocument<EmergencyContact>;
export const EmergencyContactSchema = SchemaFactory.createForClass(EmergencyContact);
