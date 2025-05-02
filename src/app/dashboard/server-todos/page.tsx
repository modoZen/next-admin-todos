import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Listado de pendientes",
  description: "SEO title",
};

export default async function ServerTodosPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  const todos = await prisma.todo.findMany({
    orderBy: { description: "asc" },
    where: { userId: session.user.id },
  });

  return (
    <div>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
