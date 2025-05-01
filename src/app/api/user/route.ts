import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await prisma.user.findMany();

  return NextResponse.json(todos, { status: 200 });
}
