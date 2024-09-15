import { verifyCNPJ } from "@utils/documents/verifyCNPJUtils";
import { verifyCPF } from "@utils/documents/verifyCPFUtils";

class VerifyDocumentUseCase {
  async execute(documentNumber: string) {
    if (documentNumber.length === 11) {
      return verifyCPF(documentNumber)
    } else if (documentNumber.length === 14) {
      return verifyCNPJ(documentNumber)
    }

    throw new Error("Invalid document");    
  }
}

export { VerifyDocumentUseCase };

