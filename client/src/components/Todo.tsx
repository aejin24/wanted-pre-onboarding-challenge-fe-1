import { useState } from "react";
import { ITodoResponse } from "../types/todo";
import Detail from "./Detail";

interface Props {
  todos: ITodoResponse[];
}

export default function Todo({ todos }: Props) {
  const [targetId, setTargetId] = useState("");

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

      {targetId !== "" ? (
        <Detail
          todo={todos.filter((t) => t.id === targetId)[0]}
          setTargetId={setTargetId}
        />
      ) : (
        <div />
      )}
    </div>
  );
}
