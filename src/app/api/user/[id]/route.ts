import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Segments {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const id = params.id;

  const dbUser = await prisma.user.findUnique({ where: { id } });

  if (!dbUser) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(dbUser, { status: 200 });
}

export async function PUT(request: Request, { params }: Segments) {
  const id = params.id;

  try {
    const body = await request.json();

    const updatedTodo = await prisma.user.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
