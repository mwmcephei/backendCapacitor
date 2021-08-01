import * as mongoose from 'mongoose';
export declare const ArtifactSchema: mongoose.Schema<mongoose.Document<any, any, any>, mongoose.Model<any, any, any>, undefined, any>;
export interface Artifact {
    id: number;
    description: string;
    progress: number;
    budget: string;
    achievement: string;
    work: string;
}
