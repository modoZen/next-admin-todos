"use client";
import { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
// import { todosApi } from "../helpers/todos";
import { TodoItem } from "./TodoItem";
import { toggleTodo } from "../actions/todos-action";

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter();

  // const handleToggleTodo = async (id: string, completed: boolean) => {
  //   await todosApi.updateTodo(id, completed);

  //   router.refresh();
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
