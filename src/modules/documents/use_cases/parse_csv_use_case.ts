import csv from 'csv-parser';
import fs from 'fs';

class ParseCsvUseCase {

  async execute(filePath: string) {
    try {
      return new Promise((resolve, reject) => {
        const results: any = [];

        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', (error) => reject(error));
      });

    } catch (error) {
      console.error(error)
    }
  }
}

export { ParseCsvUseCase };
