import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RDeleteTodo } from "../redux/todoSlice";
import { deleteTodo } from "../services/mutations";
import { ITodoResponse } from "../types/todo";
import { convertGMTtoLocal, getErrorMessage } from "../utils";
import { Modal, Loading } from "./common";

interface Props {
  todo: ITodoResponse;
}

export default function Detail({ todo }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteMutation = useMutation(async (id: string) => deleteTodo(id));

  return (
    <div>
      {deleteMutation.isLoading && <Loading />}

      {deleteMutation.isError && (
        <Modal message={getErrorMessage(deleteMutation.error)} />
      )}

      {deleteMutation.isSuccess && <Modal message="삭제 성공" />}

      {todo !== undefined && (
        <>
          <p className="desc">
            createAt: {convertGMTtoLocal(todo.createdAt)} / updateAt:{" "}
            {convertGMTtoLocal(todo.updatedAt)}
          </p>
          <p className="title">제목</p>
          <p>{todo.title}</p>

          <p className="title">내용</p>
          <p>{todo.content}</p>

          <div className="todo-options">
            <button
              onClick={() => {
                deleteMutation.mutate(todo.id!);
                dispatch(RDeleteTodo(todo.id!));
              }}
            >
              삭제하기
            </button>
            <button onClick={() => navigate(`/update/${todo.id}`)}>
              수정하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
