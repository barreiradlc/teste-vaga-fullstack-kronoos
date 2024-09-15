import { Item, Prisma } from "@prisma/client";

interface ItemRepository {
  create(data: Prisma.ItemCreateInput): Promise<Item>;
}

export { ItemRepository };

