import { Todo } from "@prisma/client";

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo: { description } }: Props) => {
  return <div>{description}</div>;
};
