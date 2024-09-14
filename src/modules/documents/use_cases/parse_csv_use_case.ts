import csv from 'csv-parser';
import fs from 'fs';

class ParseCsvUseCase {

  async execute() {
    const results: any[] = [];

    fs.createReadStream('data.csv')
      .pipe(csv())
      .on('data', (data: any) => results.push(data))
      .on('end', () => {
        console.log(results);
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]
      });

  }
}

export { ParseCsvUseCase };
