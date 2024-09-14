import { beforeAll, describe, expect, it } from 'vitest'
import { ParseCsvUseCase } from './parse_csv_use_case'

let sut: ParseCsvUseCase

describe("ParseCsvUseCase", () => {
  beforeAll(() => {
    sut = new ParseCsvUseCase()
  })

  it('Should be able to parse CSV file', async () => {
    let path = 'data.sample.csv'
    let result = await sut.execute(path)
    expect(result).toBeInstanceOf(Array)
  })

})