import {Controller, Get} from '@nestjs/common';
import {CsvParserService} from "./csv-parser.service";

@Controller('csv-parser')
export class CsvParserController {
    constructor(private csvParserService: CsvParserService) {}

    @Get()
    readAll() {
        console.log("csv")
        return this.csvParserService.parse_csv('');
    }


}
