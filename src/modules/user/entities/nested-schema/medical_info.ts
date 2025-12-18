import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
export class MedicalInfo {
  @Prop({ trim: true })
  conditions?: string;

  @Prop({ trim: true })
  primaryPhysicianName?: string;

  @Prop({ trim: true })
  primaryPhysicianContact?: string;
}

export type MedicalInfoDocument = HydratedDocument<MedicalInfo>;
export const MedicalInfoSchema = SchemaFactory.createForClass(MedicalInfo);
