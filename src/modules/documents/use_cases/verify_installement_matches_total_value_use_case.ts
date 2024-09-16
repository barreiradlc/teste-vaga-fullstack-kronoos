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

    if (valueExpected === valueReached) {
      return true
    }
    throw new Error(`Installment parcels and total does not match: ${formatNumberTo2DecimalPlaces(vlTotal)} ÷ ${Number(qtPrestacoes)} = ${formatNumberTo2DecimalPlaces(vlPresta)}`);

  }
}

export { VerifyInstallmentMatchesTotalValueUseCase }
