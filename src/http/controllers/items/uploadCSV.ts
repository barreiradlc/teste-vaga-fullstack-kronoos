import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { FormatToCurrencyUseCase } from "src/modules/documents/use_cases/format_to_currency_use_case";
import { ParseCsvUseCase } from "src/modules/documents/use_cases/parse_csv_use_case";
import { VerifyDocumentUseCase } from "src/modules/documents/use_cases/verify_document_use_case";
import { VerifyInstallmentMatchesTotalValueUseCase } from "src/modules/documents/use_cases/verify_installement_matches_total_value_use_case";
import { CreateItemUseCase } from "src/modules/items/create_item_use_case";
import { PrismaItemRepository } from 'src/repositories/item/prisma/item-repository';

async function uploadCSVController(request: FastifyRequest, reply: FastifyReply, file: any) {
  const itemRepository = new PrismaItemRepository()
  const createItemUseCase = new CreateItemUseCase(itemRepository)

  const parseCsvUseCase = new ParseCsvUseCase()
  const verifyDocumentUseCase = new VerifyDocumentUseCase()
  const verifyInstallmentMatchesTotalValueUseCase = new VerifyInstallmentMatchesTotalValueUseCase()
  const formatToCurrencyUseCase = new FormatToCurrencyUseCase()

  const items = await parseCsvUseCase.execute(file.path)

  const createdItems = []

  for (const item of items as Prisma.ItemCreateInput[]) {
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

    // Destructure number values
    const {
      // vlTotal,  Previamente atribuido
      // vlPresta, Previamente atribuido
      vlMora,
      vlMulta,
      vlOutAcr,
      vlIof,
      vlDescon,
      vlAtual
    } = item

    console.log({ errors })

    let createdItem
    if (!!errors.length) {
      createdItem = await createItemUseCase.execute({
        ...item,
        vlMora: formatToCurrencyUseCase.execute(vlMora),
        vlMulta: formatToCurrencyUseCase.execute(vlMulta),
        vlOutAcr: formatToCurrencyUseCase.execute(vlOutAcr),
        vlIof: formatToCurrencyUseCase.execute(vlIof),
        vlDescon: formatToCurrencyUseCase.execute(vlDescon),
        vlAtual: formatToCurrencyUseCase.execute(vlAtual),
        errors: {
          create: [
            errors
          ]
        }
      })
    } else {
      createdItem = await createItemUseCase.execute({
        ...item,
        vlMora: formatToCurrencyUseCase.execute(vlMora),
        vlMulta: formatToCurrencyUseCase.execute(vlMulta),
        vlOutAcr: formatToCurrencyUseCase.execute(vlOutAcr),
        vlIof: formatToCurrencyUseCase.execute(vlIof),
        vlDescon: formatToCurrencyUseCase.execute(vlDescon),
        vlAtual: formatToCurrencyUseCase.execute(vlAtual)
      })
    }

    createdItems.push(createdItem)

  }

  return reply.send({
    items: createdItems
  })
}

export { uploadCSVController };

