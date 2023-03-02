import { PrismaClient } from '@prisma/client';
import path from 'path';

export const prisma =
  process.env.NODE_ENV === 'development'
    ? new PrismaClient()
    : new PrismaClient({
      datasources: {
        db: {
          url: `file:${path.resolve(
            __dirname,
            '../../../simulation.db?connection_limit=1&connect_timeout=300'
          )}`,
        },
      },
    });
