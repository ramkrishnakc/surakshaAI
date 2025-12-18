import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { MaritalStatuses } from 'src/common/constants/enums';
import { MSG } from 'src/common/constants/messages';
import { EmergencyContact } from './nested-schema/e_contact';
import { MedicalInfo } from './nested-schema/medical_info';
import { Address } from './nested-schema/address';
import { GovtDoc } from './nested-schema/govt_doc';
import { Occupation } from './nested-schema/occupation';

@Schema({ timestamps: true })
export class UserInfo {
  // reference to User collection
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  // user full name
  @Prop({ required: [true, MSG.isRequired('Name')], trim: true })
  fullName: string;

  // user permanent address
  @Prop({ type: Address, required: [true, MSG.isRequired('Permanent Address')] })
  permanentAddress?: Address;

  // user temporary address
  @Prop({ type: Address })
  temporaryAddress?: Address;

  // is temporary address same as permanent address for the user
  @Prop({ default: false })
  isSameAddress?: boolean;

  // date of birth
  @Prop({ trim: true })
  dateOfBirth?: Date;

  // list of emergency contacts
  @Prop({ type: [EmergencyContact], default: [] })
  emergencyContacts?: EmergencyContact[];

  // medical conditions/allergies info
  @Prop({ type: MedicalInfo })
  medicalInfo?: MedicalInfo;

  // Marital status of the user
  @Prop({
    enum: {
      values: Object.values(MaritalStatuses),
      message: 'Invalid verification status',
    },
    default: MaritalStatuses.SINGLE,
    trim: true,
  })
  maritalStatus?: string;

  // Occupation of the user
  @Prop({ trim: true })
  occupation?: Occupation;

  // List of government IDs/documents
  @Prop({ type: [GovtDoc], default: [] })
  govtDocs?: GovtDoc[];

  // URLs of profile image and documents
  @Prop({ trim: true })
  imageUrl?: string;
}

export type UserInfoDocument = HydratedDocument<UserInfo>;
export const UserInfoSchema = SchemaFactory.createForClass(UserInfo);
