import { describe, expect, it } from "@jest/globals";
import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {
  it('should can create many records', async () => {
    const { count } = await prismaClient.customer.createMany({
      data: [
        {
          id: "bolang",
          email: "bolang@qmun14.com",
          name: "Bolang",
          phone: "67532123232"
        },
        {
          id: "budi",
          email: "budi@gmail.com",
          name: "Budi",
          phone: "086623232232"
        }
      ]
    });

    expect(count).toBe(2);

  });

  it('should can be update many records', async () => {
    const { count } = await prismaClient.customer.updateMany({
      data: {
        email: "budilagi@qmun14.com",
      },
      where: {
        name: "Budi"
      }
    });

    expect(count).toBe(1);
  });

  it("should can delete many records", async () => {
    const { count } = await prismaClient.customer.deleteMany({
      where: { name: "Tidak ada" }
    });
    expect(count).toBe(0);
  });

  it("should can read many records", async () => {
    const customers = await prismaClient.customer.findMany({});
    console.log(customers);
    expect(customers.length).toBe(8);
  });

});