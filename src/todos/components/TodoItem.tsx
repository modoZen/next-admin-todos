import { Todo } from "@prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

import styles from "./TodoItem.module.css";

interface Props {
  todo: Todo;
  // TODO: Acciones que quiero llamar
  toggleTodo: (id: string, completed: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({
  todo: { id, description, completed },
  toggleTodo,
}: Props) => {
  return (
    <div className={completed ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div
          onClick={() => toggleTodo(id, !completed)}
          className={`
          flex p-2 rounded-md cursor-pointer
          hover:bg-opacity-60
          ${completed ? "bg-blue-100" : "bg-red-100"}
        `}
        >
          {completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>
        <div className="text-center sm:text-left">{description}</div>
      </div>
    </div>
  );
};
