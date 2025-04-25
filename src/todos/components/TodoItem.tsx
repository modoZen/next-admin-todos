import { Todo } from "@prisma/client";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

import styles from "./TodoItem.module.css";

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo: { description, completed } }: Props) => {
  return (
    <div className={completed ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <div
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
