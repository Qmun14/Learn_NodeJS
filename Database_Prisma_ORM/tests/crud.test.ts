import { describe, expect, it } from "@jest/globals";
import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {
  it('should be able to create customer', async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "KmZWaY",
        email: "mamun@gmail.com",
        name: "Ma'mun Ramdhan",
        phone: "08123456789"
      }
    });

    expect(customer.id).toBe("KmZWaY");
    expect(customer.email).toBe("mamun@gmail.com");
    expect(customer.name).toBe("Ma'mun Ramdhan");
    expect(customer.phone).toBe("08123456789");
  });

  it('should be able to update customer', async () => {
    const customer = await prismaClient.customer.update({
      data: {
        name: "Ma'mun Ramdhan van der werff",
      },
      where: {
        id: "KmZWaY"
      }
    });

    expect(customer.id).toBe("KmZWaY");
    expect(customer.email).toBe("mamun@gmail.com");
    expect(customer.name).toBe("Ma'mun Ramdhan van der werff");
    expect(customer.phone).toBe("08123456789");
  });

  it('should be able to read customer', async () => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: "KmZWaY"
      }
    });

    expect(customer.id).toBe("KmZWaY");
    expect(customer.email).toBe("mamun@gmail.com");
    expect(customer.name).toBe("Ma'mun Ramdhan van der werff");
    expect(customer.phone).toBe("08123456789");
  });

  it('should be able to delete customer', async () => {
    const customer = await prismaClient.customer.delete({
      where: {
        id: "KmZWaY"
      }
    });

    expect(customer.id).toBe("KmZWaY");
    expect(customer.email).toBe("mamun@gmail.com");
    expect(customer.name).toBe("Ma'mun Ramdhan van der werff");
    expect(customer.phone).toBe("08123456789");
  });
});