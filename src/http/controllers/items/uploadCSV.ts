import { FastifyReply, FastifyRequest } from "fastify";
import { FormatToCurrencyUseCase } from "src/modules/documents/use_cases/format_to_currency_use_case";
import { ParseCsvUseCase } from "src/modules/documents/use_cases/parse_csv_use_case";
import { VerifyDocumentUseCase } from "src/modules/documents/use_cases/verify_document_use_case";
import { VerifyInstallmentMatchesTotalValueUseCase } from "src/modules/documents/use_cases/verify_installement_matches_total_value_use_case";

async function uploadCSVController(request: FastifyRequest, reply: FastifyReply, file: any) {
  const parseCsvUseCase = new ParseCsvUseCase()
  const verifyDocumentUseCase = new VerifyDocumentUseCase()
  const verifyInstallmentMatchesTotalValueUseCase = new VerifyInstallmentMatchesTotalValueUseCase()
  const formatToCurrencyUseCase = new FormatToCurrencyUseCase()

  const items = await parseCsvUseCase.execute(file.path)

  // TODO, tipar com a conecção com o banco de dados 
  for (const item of items as any[]) {
    const { qtPrestacoes, vlPresta, vlTotal, nrCpfCnpj } = item
    const errors = []

    const isInstallmentMatchingTotalValue = verifyInstallmentMatchesTotalValueUseCase.execute({
      qtPrestacoes,
      vlPresta,
      vlTotal
    })

    if (!isInstallmentMatchingTotalValue) {
      errors.push({
        message: `O calculo de prestações e valor total não fecha ${qtPrestacoes} * ${vlTotal} !== ${vlPresta}`
      })
    }

    const isDocumentValid = verifyDocumentUseCase.execute(nrCpfCnpj)

    if (!isDocumentValid) {
      errors.push({
        message: `O documento fornceido está com um formato inválido`
      })
    }

    return reply.send({
      items,
      errors
    })
  }

}

export { uploadCSVController };

