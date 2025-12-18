import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { DocumentTypes, VerificationStatuses } from 'src/common/constants/enums';

@Schema({ _id: true })
export class GovtDoc {
  @Prop({
    enum: {
      values: Object.values(DocumentTypes),
      message: 'Invalid document type',
    },
    trim: true,
  })
  docType: string;

  @Prop({ required: true, trim: true })
  imageUrl: string;

  @Prop({
    enum: {
      values: Object.values(VerificationStatuses),
      message: 'Invalid verification status',
    },
    default: VerificationStatuses.NONE,
    trim: true,
  })
  status?: string;
}

export type GovtDocDocument = HydratedDocument<GovtDoc>;
export const GovtDocSchema = SchemaFactory.createForClass(GovtDoc);
