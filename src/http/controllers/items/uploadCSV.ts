import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { FormatToCurrencyUseCase } from "src/modules/documents/use_cases/format_to_currency_use_case";
import { ParseCsvUseCase } from "src/modules/documents/use_cases/parse_csv_use_case";
import { VerifyDocumentUseCase } from "src/modules/documents/use_cases/verify_document_use_case";
import { VerifyInstallmentMatchesTotalValueUseCase } from "src/modules/documents/use_cases/verify_installement_matches_total_value_use_case";
import { CreateItemUseCase } from "src/modules/items/create_item_use_case";
import { PrismaItemRepository } from 'src/repositories/item/prisma/item-repository';

interface ErrorPayloadDTO {
  message: string
}

async function uploadCSVController(request: FastifyRequest, reply: FastifyReply, file: any) {
  const itemRepository = new PrismaItemRepository()
  const createItemUseCase = new CreateItemUseCase(itemRepository)

  const parseCsvUseCase = new ParseCsvUseCase()
  const verifyDocumentUseCase = new VerifyDocumentUseCase()
  const verifyInstallmentMatchesTotalValueUseCase = new VerifyInstallmentMatchesTotalValueUseCase()
  const formatToCurrencyUseCase = new FormatToCurrencyUseCase()

  const items = await parseCsvUseCase.execute(file.path)

  const createdItems = [] as Prisma.ItemCreateInput[]

  for (const item of items as Prisma.ItemCreateInput[]) {
    const { qtPrestacoes, vlPresta, vlTotal, nrCpfCnpj } = item
    const errors = [] as ErrorPayloadDTO[]

    try {
      await verifyInstallmentMatchesTotalValueUseCase.execute({
        qtPrestacoes,
        vlPresta,
        vlTotal
      })      
    } catch (error) {
      if (error instanceof Error) {
        const { message } = error
        errors.push({
          message: message
        })
      }
    }

    try {
      await verifyDocumentUseCase.execute(nrCpfCnpj)
    } catch (error) {
      if (error instanceof Error) {
        const { message } = error
        errors.push({
          message: message
        })
      }
    }

    // Destructure monetary values
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

    let createdItem = await createItemUseCase.execute({
      ...item,
      vlTotal: formatToCurrencyUseCase.execute(vlTotal),
      vlPresta: formatToCurrencyUseCase.execute(vlPresta),
      vlMora: formatToCurrencyUseCase.execute(vlMora),
      vlMulta: formatToCurrencyUseCase.execute(vlMulta),
      vlOutAcr: formatToCurrencyUseCase.execute(vlOutAcr),
      vlIof: formatToCurrencyUseCase.execute(vlIof),
      vlDescon: formatToCurrencyUseCase.execute(vlDescon),
      vlAtual: formatToCurrencyUseCase.execute(vlAtual),
      errors: {
        createMany: {
          data: errors
        }
      }
    })

    createdItems.push(createdItem)
  }

  return reply.send({
    items: createdItems
  })
}

export { uploadCSVController };

