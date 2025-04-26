import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { boolean, object, string } from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      { message: "Tiene que ser un numero" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos, { status: 200 });
}

const postSchema = object({
  description: string().required(),
  completed: boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const bodyRaw = await request.json();

    const { completed, description } = await postSchema.validate(bodyRaw);

    const todo = await prisma.todo.create({ data: { completed, description } });
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE() {
  try {
    await prisma.todo.deleteMany({
      where: { completed: true },
    });

    return NextResponse.json("Borrados completados");
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
