import { Todo } from "@prisma/client";

const updateTodo = async (id: string, completed: boolean): Promise<Todo> => {
  const body = { completed };

  const res = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const todo = await res.json();

  console.log(todo);

  return todo;
};

const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };

  const res = await fetch("/api/todos/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const todo = await res.json();

  console.log(todo);

  return todo;
};

const deleteCompletedTodos = async () => {
  await fetch("/api/todos", {
    method: "DELETE",
  });
};

export const todosApi = {
  updateTodo,
  createTodo,
  deleteCompletedTodos,
};
