import { describe, it } from "@jest/globals";
import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {
  it('should can insert and include', async () => {
    const comment = await prismaClient.comment.create({
      data: {
        customer_id: "mamun",
        title: "Insert Comment",
        description: "Description Comment"
      },
      include: {
        customer: true,
      }
    });

    console.log(comment);
  });

  it("should can insert and many realtion", async () => {
    const customer = await prismaClient.customer.create({
      data: {
        id: "alex",
        name: "Alex",
        email: "alex@qmun14.com",
        phone: "9234723434",
        comments: {
          createMany:
          {
            data: [
              {
                title: "Comment 1",
                description: "Description 1"
              },
              {
                title: "Comment 2",
                description: "Description 2"
              }
            ]
          }
        }
      },
      include: {
        comments: true,
      }
    });
    console.log(customer);
  });

  it('should can find many with filter relation', async () => {
    const customers = await prismaClient.customer.findMany({
      where: {
        comments: {
          some: {
            title: {
              contains: "Comment"
            }
          }
        }
      },
      include: {
        comments: true,
      }
    });
    console.log(JSON.stringify(customers));
  });

});