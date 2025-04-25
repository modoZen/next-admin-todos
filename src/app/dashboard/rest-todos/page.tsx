import prisma from "@/lib/prisma";

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
      <h1>RestTodos Page</h1>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.description}</div>
      ))}
    </div>
  );
}
