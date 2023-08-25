import { describe, it } from '@jest/globals';
import { PrismaClient } from '@prisma/client';

describe('Prisma Client', () => {
  it('should be able to conncect to database', async () => {
    const prisma = new PrismaClient();
    await prisma.$connect();

    // do something

    await prisma.$disconnect();
  })
})