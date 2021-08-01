import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Artifact } from './artifact.schema';

export type MeasureDocument = Measure & Document;

@Schema()
export class Measure {
  @Prop()
  title: string;

  @Prop()
  risk: number;

  @Prop()
  budget: number;

  @Prop()
  artefact: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Artifact' })
  artefacts: [Artifact];
}

export const MeasureSchema = SchemaFactory.createForClass(Measure);