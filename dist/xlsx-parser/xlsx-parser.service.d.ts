import { Measure } from '../schemas/measure.schema';
import { Artifact } from '../schemas/artifact.schema';
import { Model } from 'mongoose';
export declare class XlsxParserService {
    private artifactModel;
    private measureModel;
    constructor(artifactModel: Model<Artifact>, measureModel: Model<Measure>);
    getArtefactsOfMeasure(measureID: string): Promise<string>;
    getAllMeasures(): Promise<string>;
    parse(): string;
    getArtefacts_fromLinesArray(sheet: Object[]): Object[];
    getColumn(rawValue: string): number;
    parse_overview(): string;
    getObjectFromArrayWithKey(input: Object[], inputKey: number): Object;
}
