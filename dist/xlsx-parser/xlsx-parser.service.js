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
exports.XlsxParserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let XlsxParserService = class XlsxParserService {
    constructor(artifactModel, measureModel) {
        this.artifactModel = artifactModel;
        this.measureModel = measureModel;
    }
    async getArtefactsOfMeasure(measureID) {
        const result = await (await this.measureModel.findById(measureID)).populate("artefacts").execPopulate();
        return JSON.stringify(result.artefacts);
    }
    async getAllMeasures() {
        const result = await this.measureModel.find();
        console.log(result);
        return JSON.stringify(result);
    }
    parse() {
        var path = '/Users/mwm/Desktop/PMO_Tool/pmo-backend/src/xlsx-parser/';
        var XLSX = require('xlsx');
        var workbook = XLSX.readFile(path + 'test_data.xlsx');
        var sheet_name_list = workbook.SheetNames;
        let sheetsAsJsonArray = [];
        sheet_name_list.map(sheetName => {
            const newMeasure = {
                title: sheetName,
            };
            const measure = new this.measureModel(newMeasure);
            measure.save()
                .then(async (savedMeasure) => {
                const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                const artefacts = this.getArtefacts_fromLinesArray(data);
                let savedArtefact_IDs = [];
                artefacts.map(art => {
                    const toSave = {
                        id: art["__EMPTY_1"],
                        description: art["__EMPTY_2"],
                        progress: art["__EMPTY_9"],
                        budget: art["__EMPTY_11"] ? art["__EMPTY_11"] : "",
                        achievement: art["__EMPTY_13"],
                        work: art["__EMPTY_21"],
                    };
                    const artifact = new this.artifactModel(toSave);
                    artifact.save()
                        .then(async (savedArtefact) => {
                        savedArtefact_IDs.push(savedArtefact._id);
                        await this.measureModel.updateOne({ _id: savedMeasure._id }, { $push: { artefacts: savedArtefact } });
                    })
                        .catch(err => console.log(err));
                });
            })
                .catch(err => console.log(err));
        });
        return "measures & artefacts parsed and saved to DB";
    }
    getArtefacts_fromLinesArray(sheet) {
        return sheet.filter(line => {
            const firstKey = Object.keys(line)[0];
            if (firstKey === "__EMPTY_1") {
                let firstItem = line[firstKey];
                try {
                    if (parseInt(firstItem) < 10 && Object.keys(line).length > 2) {
                        return line;
                    }
                }
                catch (e) {
                    console.log("-");
                }
            }
        });
    }
    getColumn(rawValue) {
        const asArray = rawValue.split('_');
        return parseInt(asArray[asArray.length - 1]);
    }
    parse_overview() {
        var path = '/Users/mwm/Desktop/PMO/pmo/packages/pmo-backend/src/xlsx-parser/';
        var XLSX = require('xlsx');
        var workbook = XLSX.readFile(path + 'test_data.xlsx');
        var sheet_name_list = workbook.SheetNames;
        let sheetsAsJsonArray = [];
        sheet_name_list.map(sheetName => {
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            sheetsAsJsonArray.push(data);
        });
        const overview_object = workbook.Sheets["Status Overview"];
        let risks = [];
        Object.keys(overview_object).filter(key => {
            if (key.includes("P")) {
                const row = parseInt(key.substring(1));
                if (row > 4) {
                    risks.push({
                        row: row,
                        risk: overview_object[key]["v"],
                    });
                }
            }
        });
        let budgets = [];
        Object.keys(overview_object).filter(key => {
            if (key.includes("Q")) {
                const row = parseInt(key.substring(1));
                if (row > 4) {
                    budgets.push({
                        row: row,
                        budget: overview_object[key]["v"],
                    });
                }
            }
        });
        let artefacts = [];
        Object.keys(overview_object).filter(key => {
            if (key.includes("R")) {
                const row = parseInt(key.substring(1));
                if (row > 4) {
                    artefacts.push({
                        row: row,
                        artefact: overview_object[key]["v"],
                    });
                }
            }
        });
        console.log(artefacts);
        let result = [];
        Object.keys(overview_object)
            .filter(async (key) => {
            if (key.includes("D")) {
                const row = parseInt(key.substring(1));
                if (row > 4) {
                    const addToResult = {
                        row: row,
                        name: overview_object[key]["h"],
                        risk: risks[row - 5]["risk"],
                        budget: budgets[row - 5]["budget"],
                        artefact: artefacts[row - 5]["artefact"],
                    };
                    await this.measureModel.updateOne({ title: addToResult.name }, {
                        risk: addToResult.risk,
                        budget: addToResult.budget,
                        artefact: addToResult.artefact
                    });
                    result.push(addToResult);
                }
            }
        });
        console.log(result);
        return "hallo";
        return JSON.stringify(sheetsAsJsonArray);
    }
    getObjectFromArrayWithKey(input, inputKey) {
        for (let i = 0; i > input.length; i++) {
            if (inputKey in Object.keys(input[i])) {
                return input[inputKey];
            }
            else {
                return {};
            }
        }
    }
};
XlsxParserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Artifact')),
    __param(1, mongoose_1.InjectModel('Measure')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], XlsxParserService);
exports.XlsxParserService = XlsxParserService;
//# sourceMappingURL=xlsx-parser.service.js.map