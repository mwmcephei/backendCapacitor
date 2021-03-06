"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvParserModule = void 0;
const common_1 = require("@nestjs/common");
const csv_parser_controller_1 = require("./csv-parser.controller");
const csv_parser_service_1 = require("./csv-parser.service");
let CsvParserModule = class CsvParserModule {
};
CsvParserModule = __decorate([
    common_1.Module({
        controllers: [csv_parser_controller_1.CsvParserController],
        providers: [csv_parser_service_1.CsvParserService, csv_parser_controller_1.CsvParserController]
    })
], CsvParserModule);
exports.CsvParserModule = CsvParserModule;
//# sourceMappingURL=csv-parser.module.js.map