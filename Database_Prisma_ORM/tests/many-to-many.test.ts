import { describe, it } from "@jest/globals";
import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {
  it('should can insert many to many realation', async () => {
    const like = await prismaClient.like.create({
      data: {
        customer_id: "budi",
        product_id: "P0001"
      },
      include: {
        customer: true,
        product: true,
      }
    });
    console.log(like);
  });

  it('should can findOne with many to many relation', async () => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: "mamun"
      },
      include: {
        likes: {
          include: {
            product: true
          }
        }
      }
    });
    console.log(JSON.stringify(customer));
  });
  it('should can find Many with many to many relation', async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        likes: {
          some: {
            product: {
              name: {
                contains: "A"
              }
            }
          }
        }
      },
      include: {
        likes: {
          include: {
            product: true
          }
        }
      }
    });
    console.log(JSON.stringify(customers));
  });

  it('should create implicit relation', async () => {
    const customers = await prismaClient.customer.update({
      where: {
        id: 'mamun'
      },
      data: {
        loves: {
          connect: [
            {
              id: 'P0001'
            },
            {
              id: 'P0002'
            }
          ]
        }
      },
      include: {
        loves: true
      }
    });
    console.log(customers);
  });

  it('should findMany implicit relation', async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        loves: {
          some: {
            name: {
              contains: "A"
            }
          }
        }
      },
      include: {
        loves: true
      }
    });
    console.log(JSON.stringify(customers));
  });
});