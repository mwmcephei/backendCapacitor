import { Module } from '@nestjs/common';
import { CsvParserController } from './csv-parser.controller';
import { CsvParserService } from './csv-parser.service';

@Module({
  controllers: [CsvParserController],
  providers: [CsvParserService, CsvParserController]
})
export class CsvParserModule {}
