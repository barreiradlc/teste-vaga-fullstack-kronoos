import { beforeAll, describe, expect, it } from 'vitest'
import { FormatToCurrencyUseCase } from './format_to_currency_use_case'

let sut: FormatToCurrencyUseCase

describe("FormatToCurrencyUseCase", () => {
  beforeAll(() => {
    sut = new FormatToCurrencyUseCase()
  })

  it('Should be able to format to Brazilian Real', async () => {
    let value = 536.4
    let result = await sut.execute(value)
    expect(result).toBeTypeOf('string')
    expect(result).toMatch(/R\$/)
    expect(result).toMatch(/536,40/)
  })

})