import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { XlsxParserService } from './xlsx-parser.service';
import { XlsxParserController } from './xlsx-parser.controller';
import { Sheet, SheetSchema } from '../schemas/sheet.schema';
import { Measure, MeasureSchema } from '../schemas/measure.schema';
import { Artifact, ArtifactSchema } from '../schemas/artifact.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Sheet", schema: SheetSchema },
      { name: "Measure", schema: MeasureSchema },
      { name: "Artifact", schema: ArtifactSchema },
    
    ])
  ],
  providers: [XlsxParserController, XlsxParserService],
  controllers: [XlsxParserController]
})
export class XlsxParserModule {}
