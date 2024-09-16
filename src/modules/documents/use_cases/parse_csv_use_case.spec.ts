import { Item } from '@prisma/client';
import { beforeAll, describe, expect, it } from 'vitest';
import { ParseCsvUseCase } from './parse_csv_use_case';

let sut: ParseCsvUseCase

describe("ParseCsvUseCase", () => {
  beforeAll(() => {
    sut = new ParseCsvUseCase()
  })

  it('Should be able to parse CSV file', async () => {
    let path = 'assets/data.csv'

    let result: Item[] = await sut.execute(path)    

    expect(result).toBeInstanceOf(Array)
  })

  it('Should NOT be able to parse an invalid CSV file', async () => {
    let path = 'assets/data.invalid.txt'

    await expect(() =>
      sut.execute(path),
    )
      .rejects
      .toBeInstanceOf(Error)
  })
})