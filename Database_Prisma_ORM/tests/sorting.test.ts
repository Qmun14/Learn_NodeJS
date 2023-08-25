import { describe, expect, it } from "@jest/globals";
import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {
  it("should can do sorting", async () => {
    const customers = await prismaClient.customer.findMany({
      skip: 0,
      take: 10,
      orderBy: [
        {
          name: "desc"
        },
        {
          email: "asc"
        }
      ]
    });

    console.log(customers);

  });
});