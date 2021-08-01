import { CsvParserService } from "./csv-parser.service";
export declare class CsvParserController {
    private csvParserService;
    constructor(csvParserService: CsvParserService);
    readAll(): void;
}
