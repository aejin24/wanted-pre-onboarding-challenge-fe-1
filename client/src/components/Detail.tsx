import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RDeleteTodo } from "../redux/todoSlice";
import { deleteTodo } from "../services/mutations";
import { ITodoResponse } from "../types/todo";
import { convertGMTtoLocal, getErrorMessage } from "../utils";
import Loading from "./Loading";
import Modal from "./Modal";

interface Props {
  todo: ITodoResponse;
  setTargetId: React.Dispatch<React.SetStateAction<string>>;
}

export default function Detail({ todo, setTargetId }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteMutation = useMutation(async (id: string) => deleteTodo(id));

  return (
    <>
      {deleteMutation.isLoading && <Loading />}

      {deleteMutation.isError && (
        <Modal message={getErrorMessage(deleteMutation.error)} />
      )}
      {deleteMutation.isSuccess && <Modal message="삭제 성공" />}

      <div>
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
            onClick={async () => {
              await deleteMutation.mutateAsync(todo.id!);

              if (deleteMutation.isSuccess) {
                dispatch(RDeleteTodo(todo.id!));
                setTargetId("");
              }
            }}
          >
            삭제하기
          </button>
          <button onClick={() => navigate(`/update/${todo.id}`)}>
            수정하기
          </button>
        </div>
      </div>
    </>
  );
}
