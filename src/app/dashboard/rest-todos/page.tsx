import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";

export const metadata = {
  title: "Listado de pendientes",
  description: "SEO title",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  // useEffect(() => {
  //   fetch("/api/todos")
  //     .then((res) => res.json())
  //     .then(console.log);
  // }, []);

  return (
    <div>
      <TodosGrid todos={todos} />
    </div>
  );
}
