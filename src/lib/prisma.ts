import { PrismaClient } from "@prisma/client";

// Extend the NodeJS.Global interface to include the prisma property
declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!(global as NodeJS.Global).prisma) {
    (global as NodeJS.Global).prisma = new PrismaClient();
  }
  prisma = (global as NodeJS.Global).prisma;
}

export default prisma;
