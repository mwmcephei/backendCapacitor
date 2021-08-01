import {Controller, Get, Param} from '@nestjs/common';
import {XlsxParserService} from "./xlsx-parser.service";

@Controller('xlsx-parser')
export class XlsxParserController {
    constructor(private xlsxParseService: XlsxParserService) {}


    @Get()
    parse() {
        console.log("xlsx")

        return this.xlsxParseService.parse_overview();
     //   return "test"
     //   return this.xlsxParseService.parse();
    }

    @Get('artefacts/:measureID')
    getArtefactsOfMeasure(@Param() params){
        console.log("getAllArtefacts")
        console.log(params.measureID )
       return this.xlsxParseService.getArtefactsOfMeasure(params.measureID);
    }

    @Get("all_artefacts")
    getAllArtefacts() {
        console.log("getAllArtefacts")

        return "hi"
 //       return this.xlsxParseService.getAllArtefacts();
    }

    

    
    

    @Get("measures")
    getAllMeasures() {
        console.log("getAllMeasures")

        return this.xlsxParseService.getAllMeasures();
    }


}

