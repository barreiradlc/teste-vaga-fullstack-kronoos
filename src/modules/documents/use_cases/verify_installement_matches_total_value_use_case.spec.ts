import { beforeAll, describe, expect, it } from 'vitest'
import { VerifyInstallmentMatchesTotalValueUseCase } from './verify_installement_matches_total_value_use_case'

let sut: VerifyInstallmentMatchesTotalValueUseCase

type ItemType = {
  vlTotal: string,
  qtPrestacoes: string,
  vlPresta: string
}

describe("VerifyInstallmentMatchesTotalValueUseCase", () => {
  beforeAll(() => {
    sut = new VerifyInstallmentMatchesTotalValueUseCase()
  })

  it('Should be able to verify if the value to be paid matches the correct value', async () => {
    const item: ItemType = {
      qtPrestacoes: '5',
      vlTotal: '83720.19',
      vlPresta: '16744.03'
    }

    const result = await sut.execute(item)

    expect(result).toBeTruthy()
  })

  it('Should be able to verify if the value to be paid DOES NOT matches the correct value', async () => {
    const item: ItemType = {
      qtPrestacoes: '5',
      vlTotal: '83720.19',
      vlPresta: '17524.03',
    }

    const result = await sut.execute(item)

    expect(result).toBeFalsy()
  })

})