import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Artifact } from './artifact.schema';
export declare type MeasureDocument = Measure & Document;
export declare class Measure {
    title: string;
    risk: number;
    budget: number;
    artefact: number;
    artefacts: [Artifact];
}
export declare const MeasureSchema: mongoose.Schema<mongoose.Document<Measure, any, any>, mongoose.Model<any, any, any>, undefined, any>;
