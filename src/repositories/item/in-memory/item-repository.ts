import { Item, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { ItemRepository } from "../item-repository";


class InMemoryItemRepository implements ItemRepository {
  public items: Item[] = [];

  async create(data: Prisma.ItemCreateInput) {
    const item = {
      ...data,
      id: randomUUID(),
      errors: []
    }

    this.items.push(item)

    return item
  }

}

export { InMemoryItemRepository };
