import { describe, expect, it } from "@jest/globals";
import { prismaClient } from "../src/prisma-client";
import { Prisma } from "@prisma/client";

describe('Prisma Client', () => {
  it("should can execute sequential transaction", async () => {
    const [mamun, ramdhan] = await prismaClient.$transaction([
      prismaClient.customer.create({
        data: {
          id: "mamun",
          email: "mamun@qmun14.com",
          name: "Mamun",
          phone: "025185766234"
        }
      }),
      prismaClient.customer.create({
        data: {
          id: "ramdhan",
          email: "ramdhan@qmun14.com",
          name: "Ramdhan",
          phone: "02143434555"
        }
      })
    ]);

    expect(mamun.name).toBe("Mamun");
    expect(ramdhan.name).toBe("Ramdhan");

  });

  it("should can execute interractive transaction", async () => {
    const [mamun, ramdhan] = await prismaClient.$transaction(async (prisma) => {
      const mamun = await prisma.customer.create({
        data: {
          id: "mamun2",
          email: "mamun2@qmun14.com",
          name: "Mamun",
          phone: "02518576623456"
        }
      })
      const ramdhan = await prisma.customer.create({
        data: {
          id: "ramdhan2",
          email: "ramdhan2@qmun14.com",
          name: "Ramdhan",
          phone: "0214343455567"
        }
      })

      return [mamun, ramdhan];
    }, {
      timeout: 5
    });
    expect(mamun.name).toBe("Mamun");
    expect(ramdhan.name).toBe("Ramdhan");
  });

});