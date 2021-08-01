"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParserService = void 0;
const common_1 = require("@nestjs/common");
const csv_parser = require("csv-parser");
const fs = require("fs");
let CsvParserService = class CsvParserService {
    constructor() {
        this.results = [];
    }
    parse_csv(csv_path) {
        var path = '/Users/mwm/Desktop/PMO/pmo/packages/pmo-backend/src/csv-parser';
        fs.createReadStream(path + '/test_report.csv')
            .pipe(csv_parser({ separator: ';' }))
            .on('data', (data) => {
            console.log(data);
        })
            .on('end', () => {
            console.log(this.results);
        });
    }
};
CsvParserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], CsvParserService);
exports.CsvParserService = CsvParserService;
//# sourceMappingURL=csv-parser.service.js.map