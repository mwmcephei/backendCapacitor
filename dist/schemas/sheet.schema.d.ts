import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Measure } from './measure.schema';
export declare type SheetDocument = Sheet & Document;
export declare class Sheet {
    name: string;
    artifacts: [Measure];
}
export declare const SheetSchema: mongoose.Schema<mongoose.Document<Sheet, any, any>, mongoose.Model<any, any, any>, undefined, any>;
