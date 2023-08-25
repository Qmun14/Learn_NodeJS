import { describe, expect, it } from "@jest/globals";
import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {
  it("should can count", async () => {
    const total = await prismaClient.customer.count({
      where: {
        name: "Mamun"
      }
    });

    expect(total).toBe(3);
  });
})