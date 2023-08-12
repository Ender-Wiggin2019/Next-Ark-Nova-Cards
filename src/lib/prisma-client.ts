import type { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'development') {
  import('@prisma/client').then((mod) => (prisma = new mod.PrismaClient()));
} else {
  // import('@prisma/client/edge').then(
  //   (mod) => (prisma = new mod.PrismaClient())
  // );
  import('@prisma/client').then((mod) => (prisma = new mod.PrismaClient()));
}
export { prisma };
