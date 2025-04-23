import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete * from todo

  await prisma.todo.createMany({
    data: [
      { description: "Gema del alma", completed: true },
      { description: "Gema del poder" },
      { description: "Gema del tiempo" },
      { description: "Gema del espacio" },
      { description: "Gema de la realidad" },
      { description: "Gema de la mente" },
    ],
  });

  return NextResponse.json({
    message: "Seeding database...",
  });
}
