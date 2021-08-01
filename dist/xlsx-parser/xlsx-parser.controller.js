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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XlsxParserController = void 0;
const common_1 = require("@nestjs/common");
const xlsx_parser_service_1 = require("./xlsx-parser.service");
let XlsxParserController = class XlsxParserController {
    constructor(xlsxParseService) {
        this.xlsxParseService = xlsxParseService;
    }
    parse() {
        console.log("xlsx");
        return this.xlsxParseService.parse_overview();
    }
    getArtefactsOfMeasure(params) {
        console.log("getAllArtefacts");
        console.log(params.measureID);
        return this.xlsxParseService.getArtefactsOfMeasure(params.measureID);
    }
    getAllArtefacts() {
        console.log("getAllArtefacts");
        return "hi";
    }
    getAllMeasures() {
        console.log("getAllMeasures");
        return this.xlsxParseService.getAllMeasures();
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], XlsxParserController.prototype, "parse", null);
__decorate([
    common_1.Get('artefacts/:measureID'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], XlsxParserController.prototype, "getArtefactsOfMeasure", null);
__decorate([
    common_1.Get("all_artefacts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], XlsxParserController.prototype, "getAllArtefacts", null);
__decorate([
    common_1.Get("measures"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], XlsxParserController.prototype, "getAllMeasures", null);
XlsxParserController = __decorate([
    common_1.Controller('xlsx-parser'),
    __metadata("design:paramtypes", [xlsx_parser_service_1.XlsxParserService])
], XlsxParserController);
exports.XlsxParserController = XlsxParserController;
//# sourceMappingURL=xlsx-parser.controller.js.map