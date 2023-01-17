import "../assets/css/input.css";
import { useNavigate, useParams } from "react-router-dom";
import { ITodo, ITodoResponse, MODE } from "../types/todo";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { createTodo, updateTodo } from "../services/mutations";
import { Loading, Modal } from "../components/common";
import { getErrorMessage } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RAddTodo, RUpdateTodo } from "../redux/todoSlice";
import { ReducerType } from "../redux/rootReducer";

interface Props {
  mode: MODE;
  todo?: ITodo;
}

export default function Input({ mode }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [registerTodo, setRegisterTodo] = useState<ITodo>({
    title: "",
    content: "",
  });

  const todos = useSelector<ReducerType, ITodoResponse[]>(
    (state) => state.todoReducer
  );

  useEffect(() => {
    if (id) {
      const filterTodo = todos.filter((t) => t.id === id)[0];

      setRegisterTodo({
        title: filterTodo.title,
        content: filterTodo.content,
      });
    }
  }, [id, todos]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setRegisterTodo({
      ...registerTodo,
      [name]: value,
    });
  };

  const createMutation = useMutation(createTodo);
  const updateMutation = useMutation(updateTodo);

  const todoHandler = async () => {
    switch (mode) {
      case "CREATE":
        await createMutation.mutateAsync({ ...registerTodo });

        break;

      case "UPDATE":
        await updateMutation.mutateAsync({ ...registerTodo, id });

        break;
    }
  };

  return (
    <div className="wrapper">
      {(createMutation.isLoading || updateMutation.isLoading) && <Loading />}

      {(createMutation.isError || updateMutation.isError) && (
        <Modal
          message={getErrorMessage(
            createMutation.error || updateMutation.error
          )}
        />
      )}

      {(createMutation.isSuccess || updateMutation.isSuccess) && (
        <Modal
          message={`${mode === "CREATE" ? "신규 생성" : "수정"} 완료`}
          onClickHandler={() => {
            if (mode === "UPDATE") {
              dispatch(RUpdateTodo(updateMutation.data as ITodoResponse));
            } else {
              dispatch(RAddTodo([createMutation.data] as ITodoResponse[]));
            }

            navigate("/");
          }}
        />
      )}

      <div className="header">
        <img
          src="/images/back.png"
          alt="뒤로가기"
          onClick={() => navigate("/")}
          className="back"
        />
      </div>

      <div className="input-container">
        <p className="title">제목</p>
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요"
          onChange={onChangeHandler}
          value={registerTodo.title}
        />

        <p className="title">내용</p>
        <textarea
          placeholder="내용을 입력해주세요"
          name="content"
          onChange={onChangeHandler}
          value={registerTodo.content}
        />

        <button type="button" className="submit" onClick={todoHandler}>
          {mode === "CREATE" ? "생성" : "수정"}
        </button>
      </div>
    </div>
  );
}
