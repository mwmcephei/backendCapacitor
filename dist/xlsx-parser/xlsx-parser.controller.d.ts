import { XlsxParserService } from "./xlsx-parser.service";
export declare class XlsxParserController {
    private xlsxParseService;
    constructor(xlsxParseService: XlsxParserService);
    parse(): string;
    getArtefactsOfMeasure(params: any): Promise<string>;
    getAllArtefacts(): string;
    getAllMeasures(): Promise<string>;
}
