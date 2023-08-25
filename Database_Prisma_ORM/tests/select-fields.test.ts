import { describe, expect, it } from "@jest/globals";
import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {
  it('should can create and  select fields ', async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "mochi",
        email: "mochi@qmun14.com",
        name: "Mochi Kucing",
        phone: "12312345678"
      },
      select: {
        id: true,
        name: true,
      }
    });

    expect(customer.id).toBe("mochi");
    expect(customer.name).toBe("Mochi Kucing");
    expect(customer.email).toBeUndefined();
    expect(customer.phone).toBeUndefined();
  });

  it('should can select fields', async () => {
    const customers = await prismaClient.customer.findMany({
      select: {
        id: true,
        name: true,
      }
    });

    for (let customer of customers) {
      expect(customer.id).toBeDefined();
      expect(customer.name).toBeDefined();
      expect(customer.email).toBeUndefined();
      expect(customer.phone).toBeUndefined();
    };

  });
})
