import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { FULLNAME_REGEXP } from 'src/common/constants';
import { MSG } from 'src/common/constants/messages';

@Schema({ _id: false })
export class MedicalInfo {
  @Prop({ trim: true })
  conditions?: string;

  @Prop({
    trim: true,
    match: [FULLNAME_REGEXP, MSG.invalid('Fullname')],
  })
  primaryPhysicianName?: string;

  @Prop({ trim: true })
  primaryPhysicianContact?: string;
}

export type MedicalInfoDocument = HydratedDocument<MedicalInfo>;
export const MedicalInfoSchema = SchemaFactory.createForClass(MedicalInfo);
