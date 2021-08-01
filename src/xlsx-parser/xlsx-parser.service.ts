import { Injectable } from '@nestjs/common';
import * as fs from "fs";
import { InjectModel } from '@nestjs/mongoose';
import { Sheet, SheetSchema } from '../schemas/sheet.schema';
import { Measure, MeasureSchema } from '../schemas/measure.schema';
import { Artifact, ArtifactSchema } from '../schemas/artifact.schema';
import { Model } from 'mongoose';


@Injectable()
export class XlsxParserService {

  constructor(
    @InjectModel('Artifact') private artifactModel: Model<Artifact>, 
    @InjectModel('Measure') private measureModel: Model<Measure>
    ){}

/*
  async getAllArtefacts(): Promise<string> {
    const result = await this.artifactModel.find()
    console.log(result)
    return JSON.stringify(result)
  }
*/
async getArtefactsOfMeasure(measureID: string): Promise<string> {
  const result = await (await this.measureModel.findById(measureID)).populate("artefacts").execPopulate()
//  console.log(result.artefacts)
  return JSON.stringify(result.artefacts)
}

async getAllMeasures(): Promise<string> {
  const result = await this.measureModel.find()
console.log(result)
  return JSON.stringify(result)
}



// parse and save measures and corresponding artefacts
  parse(): string {
      var path = '/Users/mwm/Desktop/PMO_Tool/pmo-backend/src/xlsx-parser/';      // change to this directory
        var XLSX = require('xlsx');
        var workbook = XLSX.readFile(path + 'test_data.xlsx', );

        // sheet here means measure
        var sheet_name_list = workbook.SheetNames;

        let sheetsAsJsonArray = []
        sheet_name_list.map(sheetName => {
          // save measure to DB
          const newMeasure = {
            title: sheetName,
          }
          const measure = new this.measureModel(newMeasure)
          measure.save()
          .then( async savedMeasure => {
            // get artefacts of this measure and add it to measure in DB
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
            const artefacts = this.getArtefacts_fromLinesArray(data)

            let savedArtefact_IDs = []
            artefacts.map(art => {
              const toSave = {
                id: art["__EMPTY_1"],
                description: art["__EMPTY_2"],
                progress: art["__EMPTY_9"],
                budget: art["__EMPTY_11"] ? art["__EMPTY_11"] : "",
                achievement: art["__EMPTY_13"],
                work: art["__EMPTY_21"],
              }
              const artifact = new this.artifactModel(toSave)
              artifact.save()
              .then( async savedArtefact => {
          //      console.log("saved artifact")
          //      console.log(savedArtefact)
                savedArtefact_IDs.push(savedArtefact._id)

                await this.measureModel.updateOne({_id: savedMeasure._id}, { $push: { artefacts: savedArtefact } });
              
              })
              .catch(err => console.log(err))
            })
          })
          .catch(err => console.log(err))
        })
    return "measures & artefacts parsed and saved to DB"
  }





  getArtefacts_fromLinesArray(sheet: Object[]): Object[]{
    return sheet.filter(line => {
      const firstKey = Object.keys(line)[0]
      if(firstKey === "__EMPTY_1"){
        let firstItem = line[firstKey]
        try {
          if(parseInt(firstItem) < 10 && Object.keys(line).length > 2){
     //       console.log(line)
            return line
          }
        } catch (e) {
          console.log("-")
        }
      }
    })
  }


  getColumn(rawValue: string): number{
    const asArray = rawValue.split('_')
    return parseInt(asArray[asArray.length - 1])
  }









    parse_overview(): string {
      var path = '/Users/mwm/Desktop/PMO/pmo/packages/pmo-backend/src/xlsx-parser/';    // change to this directory

        var XLSX = require('xlsx');
        var workbook = XLSX.readFile(path + 'test_data.xlsx');

   //     console.log(workbook.Sheets[workbook.SheetNames[0]])

        var sheet_name_list = workbook.SheetNames;

        let sheetsAsJsonArray = []
        sheet_name_list.map(sheetName => {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
  //        console.log(sheetName)
          sheetsAsJsonArray.push(data)
        })

   //     console.log(sheetsAsJsonArray[0])


   // parse overview
      const overview_object = workbook.Sheets["Status Overview"]
        let risks = []
        Object.keys(overview_object).filter(key => {
          if(key.includes("P")){
            const row = parseInt(key.substring(1))
               if(row > 4){
                risks.push({
                      row: row,
                      risk: overview_object[key]["v"],
                      }) 
                  }
            }
         })
        let budgets = []
        Object.keys(overview_object).filter(key => {
          if(key.includes("Q")){
            const row = parseInt(key.substring(1))
               if(row > 4){
                  budgets.push({
                      row: row,
                      budget: overview_object[key]["v"],
                      }) 
                  }
            }
         })
        let artefacts = []
        Object.keys(overview_object).filter(key => {
          if(key.includes("R")){
            const row = parseInt(key.substring(1))
               if(row > 4){
                artefacts.push({
                      row: row,
                      artefact: overview_object[key]["v"],
                      }) 
                  }
            }
         })
         console.log(artefacts)

       let result = []
       Object.keys(overview_object)
          .filter(async key => {           
            if(key.includes("D")){
              const row = parseInt(key.substring(1))
              if(row > 4){            
                const addToResult  =  {
                    row: row,
                    name: overview_object[key]["h"],
                    risk: risks[row - 5]["risk"],
                    budget: budgets[row - 5]["budget"],
                    artefact: artefacts[row - 5]["artefact"],
                  }
                await this.measureModel.updateOne({title: addToResult.name}, { 
                  risk: addToResult.risk,
                  budget: addToResult.budget ,
                  artefact: addToResult.artefact 
                
                } );
                result.push(addToResult)
              }
              
              
            }
          })


       console.log(result)

       return "hallo"
        return JSON.stringify(sheetsAsJsonArray)
      }






      getObjectFromArrayWithKey(input: Object[], inputKey: number): Object{
    //    console.log(inputKey)
        for(let i = 0; i > input.length; i++){
   //       console.log(Object.keys(input[i]))
          
          if(inputKey in Object.keys(input[i])){
    //        console.log(input[inputKey])
            return input[inputKey]
          }
          else {return {}  }
        }
        
        
      }
}
