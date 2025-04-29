"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  await sleep(3);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `Todo con el id ${id} no encontrado`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  await sleep(3);
  try {
    const todo = await prisma.todo.create({
      data: { completed: false, description },
    });
    revalidatePath("/dashboard/server-todos");
    return todo;
  } catch (error) {
    return {
      message: "Error creado todo",
    };
  }
};

export const deleteCompletedTodos = async () => {
  await sleep(3);
  try {
    await prisma.todo.deleteMany({ where: { completed: true } });
    revalidatePath("/dashboard/server-todos");
    return "Borrados completados";
  } catch (error) {
    return (error as Error).message;
  }
};

// export const todosServerActions = {
//   toggleTodo,
// };
