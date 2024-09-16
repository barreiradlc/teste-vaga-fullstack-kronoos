import { Item } from '@prisma/client';
import csv from 'csv-parser';
import fs from 'fs';

const SPREAD_SHEET_VALID_FORMATS = [
  'csv',
  'xls',
  'xlsx',
  'xlsm',
  'xlsb',
  'xltx',
  'xlt',
  'ods'
]

class ParseCsvUseCase {

  async execute(filePath: string) {
    try {
      return new Promise<Item[]>((resolve, reject) => {
        const fileExtension = filePath.split('.').pop()
        const isAValidFile = SPREAD_SHEET_VALID_FORMATS.some((file) => file.includes(`${fileExtension}`))

        if (!isAValidFile) {
          throw new Error("Invalid format type");
        }

        const results: any = [];

        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', (error) => reject(error));
      });

    } catch (error) {      
      throw new Error(`${error}`);      
    }
  }
}

export { ParseCsvUseCase };
