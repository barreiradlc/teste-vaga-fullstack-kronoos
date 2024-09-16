import { beforeAll, describe, expect, it, suite } from 'vitest'
import { VerifyDocumentUseCase } from './verify_document_use_case'

let sut: VerifyDocumentUseCase

describe("VerifyDocumentUseCase", () => {
  beforeAll(() => {
    sut = new VerifyDocumentUseCase()
  })


  suite('Verify CPF', async () => {
    it('should be able to verify if CPF is in a valid format', async () => {
      let document = '06529946101'

      let result = await sut.execute(document)

      expect(result).toBeTruthy()
    })
    it('should be able to retrieve and exception if the CPF is in a invalid format', async () => {
      let document = '06529946110'

      await expect(() =>
        sut.execute(document),
      )
        .rejects
        .toBeInstanceOf(Error)
    })
  })
  suite('Verify CNPJ', async () => {
    it('should be able to verify if CNPJ is in a valid format', async () => {
      let document = '11444777000161'

      let result = await sut.execute(document)

      expect(result).toBeTruthy()
    })

    it('should be able to retrieve and exception if the CNPJ is in a invalid format', async () => {
      let document = '11444777000171'

      await expect(() =>
        sut.execute(document),
      )
        .rejects
        .toBeInstanceOf(Error)
    })
  })

  it('should be able to retrieve and exception if the document have an invalid lenght', async () => {
    let document = '114447770001710'

    await expect(() =>
      sut.execute(document),
    )
      .rejects
      .toBeInstanceOf(Error)
  })

})