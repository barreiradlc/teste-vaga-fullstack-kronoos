import { Prisma } from "@prisma/client";
import { ItemRepository } from "src/repositories/item/item-repository";

class CreateItemUseCase {
  constructor(
    private itemRepository: ItemRepository
  ) { }

  async execute(request: Prisma.ItemCreateInput) {
    const item = await this.itemRepository.create(request)

    return item
  }
}

export { CreateItemUseCase };
