import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Measure } from './measure.schema';

export type SheetDocument = Sheet & Document;

@Schema()
export class Sheet {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Measure' })
  artifacts: [Measure];
}

export const SheetSchema = SchemaFactory.createForClass(Sheet);