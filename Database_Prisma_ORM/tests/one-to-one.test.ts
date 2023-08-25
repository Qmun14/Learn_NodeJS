import { describe, it } from "@jest/globals"
import { prismaClient } from "../src/prisma-client"

describe('Prisma Client', () => {
  it('should can create one to one relation', async () => {
    const wallet = await prismaClient.wallet.create({
      data: {
        id: "mamun",
        customer_id: "mamun",
        balance: 1000000
      },
      include: {
        customer: true,
      }
    });

    console.log(wallet);
  });

  it("should create one to one with relation", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "bolang2",
        name: "Bolang 2",
        email: "bolang2@qmun14.com",
        phone: "54545674",
        wallet: {
          create: {
            id: "bolang2",
            balance: 500000
          }
        }
      },
      include: {
        wallet: true,
      }
    });

    console.log(customer);
  });

  it('should can find one to one with relation', async () => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: "mamun"
      },
      include: {
        wallet: true
      }
    });
    console.log(customer);
  });

  it('should can find one to one with relation filter', async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        wallet: {
          isNot: null,
        }
      },
      include: {
        wallet: true
      }
    });
    console.log(customers);
  });
});