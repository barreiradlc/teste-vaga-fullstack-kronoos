import { InMemoryItemRepository } from 'src/repositories/item/in-memory/item-repository';
import { beforeAll, describe, expect, it } from 'vitest';
import { CreateItemUseCase } from './create_item_use_case';

let sut: CreateItemUseCase
let inMemoryItemRepository: InMemoryItemRepository

const itemPayload = {
  "nrInst": "533",
  "nrAgencia": "32",
  "cdClient": "56133",
  "nmClient": "CLIENTE 1",
  "nrCpfCnpj": "41854274761",
  "nrContrato": "733067",
  "dtContrato": "20221227",
  "qtPrestacoes": "5",
  "vlTotal": "83720.19",
  "cdProduto": "777",
  "dsProduto": "CDC PESSOA JURIDICA",
  "cdCarteira": "17",
  "dsCarteira": "CRÉDITO DIRETO AO CONSUMIDOR",
  "nrProposta": "798586",
  "nrPresta": "2",
  "tpPresta": "Original",
  "nrSeqPre": "0",
  "dtVctPre": "20220406",
  "vlPresta": "17524.03",
  "vlMora": "29196.96",
  "vlMulta": "536.4",
  "vlOutAcr": "0",
  "vlIof": "0",
  "vlDescon": "0",
  "vlAtual": "47257.39",
  "idSituac": "Aberta",
  "idSitVen": "Vencida"
}

describe("CreateItemUseCase", () => {
  beforeAll(() => {
    inMemoryItemRepository = new InMemoryItemRepository()
    sut = new CreateItemUseCase(inMemoryItemRepository)
  })

  it('Should be able to create item', async () => {
    const item = await sut.execute(itemPayload)

    expect(item.id).toBeDefined()
  })

})