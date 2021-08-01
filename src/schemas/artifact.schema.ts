import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
//import { Document } from 'mongoose';
import * as mongoose from 'mongoose';



export const ArtifactSchema = new mongoose.Schema({
    id: {type: Number},
    description: {type: String},
    progress: {type: Number},
    budget: {type: String},
    achievement: {type: String},
    work: {type: String},
})

export interface Artifact {
    id:number,
    description:string,
    progress:number,
    budget:string,
    achievement: string
    work:string,
}