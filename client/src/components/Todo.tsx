import { useState } from "react";
import { useQuery } from "react-query";
import { getTodo } from "../services/queries";
import { ITodoResponse } from "../types/todo";
import { getErrorMessage } from "../utils";
import Detail from "./Detail";
import Modal from "./Modal";

interface Props {
  todos: ITodoResponse[];
}

export default function Todo({ todos }: Props) {
  const [targetId, setTargetId] = useState("");

  const {
    data: todo,
    isLoading,
    isError,
    error,
  } = useQuery(["todo", targetId], () => getTodo(targetId), {
    enabled: targetId !== "",
  });

  if (isError) {
    return <Modal message={getErrorMessage(error)} />;
  }

  return (
    <div className="container">
      <div>
        {todos?.map((t) => (
          <p
            key={t.id}
            className="todo"
            onClick={() => {
              setTargetId(t.id || "");
            }}
          >
            {t.title}
          </p>
        ))}
      </div>

      {targetId !== "" && !isLoading ? <Detail todo={todo!} /> : <div />}
    </div>
  );
}
