import { Injectable } from '@nestjs/common';
import * as csv_parser from "csv-parser";
import * as fs from "fs";


//const test_file = require('./test_report.csv')
@Injectable()
export class CsvParserService {
    results = [];
    constructor() {}

    parse_csv(csv_path){
    //    console.log(__dirname);   // /Users/mwm/Desktop/PMO/pmo/packages/pmo-backend/src/csv-parser
        var path = '/Users/mwm/Desktop/PMO/pmo/packages/pmo-backend/src/csv-parser';

        fs.createReadStream(path + '/test_report.csv')
            .pipe(csv_parser({ separator: ';' }))
            .on('data', (data) => {
                console.log(data);
                // this.results.push(data)
            })
            .on('end', () => {
                console.log(this.results);
            })
    }
}
