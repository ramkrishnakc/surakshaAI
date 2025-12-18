import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
export class Address {
  @Prop({ trim: true })
  street: string;

  @Prop({ trim: true })
  municipality: string;

  @Prop({ trim: true })
  district: string;

  @Prop({ trim: true })
  province: string;
}

export type AddressDocument = HydratedDocument<Address>;
export const AddressSchema = SchemaFactory.createForClass(Address);
