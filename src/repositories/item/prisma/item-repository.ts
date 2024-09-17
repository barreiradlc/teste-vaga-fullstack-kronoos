import { Item, Prisma } from "@prisma/client";
import { prisma } from "src/lib/prisma";
import { ItemRepository } from "../item-repository";

class PrismaItemRepository implements ItemRepository {
  public items: Item[] = [];

  async create(data: Prisma.ItemCreateInput) {
    try {
      const item = await prisma.item.create({
        data,
        include: {
          errors: true
        }
      })

      return item
    } catch (error) {
      throw new Error("Error creating item");
    }
  }

}

export { PrismaItemRepository };
