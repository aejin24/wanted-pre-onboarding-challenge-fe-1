import { useNavigate } from "react-router-dom";
import { ITodo } from "../types/todo";

interface Props {
  todo: ITodo;
  mutate: (variables: string) => void;
}

export default function Todo({ todo, mutate }: Props) {
  const navigate = useNavigate();

  return (
    <div className="todo-wrapper">
      <p className="todo" onClick={() => navigate(`/detail/${todo.id}`)}>
        {todo.title}
      </p>

      <div className="todo-options">
        <img
          src="/images/edit.png"
          alt="수정하기"
          onClick={() => navigate(`/update/${todo.id}`)}
        />
        <img
          src="/images/trash.png"
          alt="삭제하기"
          onClick={() => {
            mutate(todo.id || "");
          }}
        />
      </div>
    </div>
  );
}
