import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
export class Occupation {
  @Prop({ required: true, trim: true })
  industry: string;
  @Prop({ required: true, trim: true })
  subIndustry: string;
  @Prop({ required: true, trim: true })
  title: string;
  @Prop({ trim: true })
  description?: string;
}

export type OccupationDocument = HydratedDocument<Occupation>;
export const OccupationSchema = SchemaFactory.createForClass(Occupation);
