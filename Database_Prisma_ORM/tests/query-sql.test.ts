import { it, describe } from "@jest/globals"
import { prismaClient } from "../src/prisma-client";

describe('Prisma Client', () => {
  it('should be able to query sql', async () => {
    const id = "1";

    const samples: any = await prismaClient.$queryRaw`SELECT * FROM sample WHERE id = ${id}`;

    for (const sample of samples) {
      console.log(`Result sample id : ${sample.id} and name ${sample.name}`);
    }

  });
});