import { Error, Item, Prisma } from "@prisma/client";

interface ItemWithErrors extends Item {
  errors: Error[]
}

interface ItemRepository {
  create(data: Prisma.ItemCreateInput): Promise<ItemWithErrors>;
}

export { ItemRepository };

