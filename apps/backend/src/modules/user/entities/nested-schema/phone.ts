import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PhoneTypes } from 'src/common/constants/enums';
import { MSG } from 'src/common/constants/messages';

@Schema({ _id: false })
export class ContactInfo {
  @Prop({
    enum: {
      values: Object.values(PhoneTypes),
      message: 'Invalid contact type',
    },
    default: PhoneTypes.MOBILE,
    trim: true,
  })
  phoneType: string;

  @Prop({ required: [true, MSG.isRequired('Phone number')], trim: true })
  phone: string;
}

export type ContactInfoDocument = HydratedDocument<ContactInfo>;
export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
