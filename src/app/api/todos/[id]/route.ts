import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { boolean, object, string } from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | undefined> => {
  const todo = await prisma.todo.findUnique({ where: { id } });
  return todo || undefined;
};

export async function GET(request: Request, { params }: Segments) {
  const id = params.id;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(todo, { status: 200 });
}

const putSchema = object({
  completed: boolean().optional(),
  description: string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const id = params.id;
  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  try {
    const { completed, description } = putSchema.validateSync(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed, description },
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
