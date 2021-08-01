import { Test, TestingModule } from '@nestjs/testing';
import { CsvParserController } from './csv-parser.controller';

describe('CsvParserController', () => {
  let controller: CsvParserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CsvParserController],
    }).compile();

    controller = module.get<CsvParserController>(CsvParserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
