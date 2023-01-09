import "../assets/css/list.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading, Modal, Todo } from "../components";
import { useMutation, useQuery } from "react-query";
import { getTodos } from "../services/queries";
import { getErrorMessage } from "../utils";
import { deleteTodo } from "../services/mutations";
import { useRecoilState } from "recoil";
import { todoAtom } from "../recoil/todo";
import { ITodoResponse } from "../types/todo";

export default function List() {
  const navigate = useNavigate();
  const [todo, setTodo] = useRecoilState<ITodoResponse[]>(todoAtom);

  const { isLoading, error, isError } = useQuery(["todos"], async () => {
    const data = await getTodos();

    setTodo(data);
  });

  const deleteMutation = useMutation(async (id: string) => {
    await deleteTodo(id);

    setTodo(todo.filter((t) => t.id !== id));
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div className="wrapper">
      {(isLoading || deleteMutation.isLoading) && <Loading />}

      {(isError || deleteMutation.isError) && (
        <Modal message={getErrorMessage(error || deleteMutation.error)} />
      )}

      {deleteMutation.isSuccess && <Modal message="삭제 성공" />}

      <div className="header">
        To Do
        <img
          src="/images/plus.png"
          alt="추가하기"
          onClick={() => navigate("/write")}
          className="plus"
        />
      </div>

      {todo?.map((t) => (
        <Todo key={t.id} todo={t} mutate={deleteMutation.mutate} />
      ))}
    </div>
  );
}
