import { formatNumberTo2DecimalPlaces } from "@utils/math/validNumbers"

type ItemValueType = {
  vlTotal: string,
  qtPrestacoes: string,
  vlPresta: string
}

class VerifyInstallmentMatchesTotalValueUseCase {
  async execute({ vlTotal, qtPrestacoes, vlPresta }: ItemValueType) {
    const valueExpected = formatNumberTo2DecimalPlaces(vlPresta)
    const valueReached = formatNumberTo2DecimalPlaces(formatNumberTo2DecimalPlaces(vlTotal) / Number(qtPrestacoes))

    return valueExpected === valueReached
  }
}

export { VerifyInstallmentMatchesTotalValueUseCase }
