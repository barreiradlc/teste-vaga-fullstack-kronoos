import { beforeAll, describe, it } from 'vitest'
import { ParseCsvUseCase } from './parse_csv_use_case'

let sut: ParseCsvUseCase

describe("ParseCsvUseCase", () => {
  beforeAll(() => {
    sut = new ParseCsvUseCase()
  })

  it('Should be able to parse CSV file', async () => {
    let result = await sut.execute()

    console.log(result)
  })

})