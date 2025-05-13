import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete * from todo
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("1234444"),
      name: "Thanos",
      roles: ["admin", "user"],
      todos: {
        create: [
          { description: "Gema del alma", completed: true },
          { description: "Gema del poder" },
          { description: "Gema del tiempo" },
          { description: "Gema del espacio" },
          { description: "Gema de la realidad" },
          { description: "Gema de la mente" },
        ],
      },
    },
  });

  // await prisma.todo.createMany({
  //   data: [
  //     { description: "Gema del alma", completed: true },
  //     { description: "Gema del poder" },
  //     { description: "Gema del tiempo" },
  //     { description: "Gema del espacio" },
  //     { description: "Gema de la realidad" },
  //     { description: "Gema de la mente" },
  //   ],
  // });

  return NextResponse.json({
    message: "Seeding database...",
  });
}
