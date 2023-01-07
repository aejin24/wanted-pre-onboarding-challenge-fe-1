import "../assets/css/input.css";
import { useNavigate, useParams } from "react-router-dom";
import { ITodo, MODE } from "../types/todo";
import { useState } from "react";
import { useMutation } from "react-query";
import { createTodo, updateTodo } from "../services/mutations";
import { Loading, Modal } from "../components";
import { getErrorMessage } from "../utils";

interface Props {
  mode: MODE;
}

export default function Input({ mode }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [todo, setTodo] = useState<ITodo>({
    title: "",
    content: "",
  });

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const createMutation = useMutation(createTodo);
  const updateMutation = useMutation(updateTodo);

  const todoHandler = async () => {
    switch (mode) {
      case "CREATE":
        await createMutation.mutateAsync({ ...todo });

        break;

      case "UPDATE":
        await updateMutation.mutateAsync({ ...todo, id });

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

      <p className="title">제목</p>
      {mode === "READ" ? (
        <p className="title">something</p>
      ) : (
        <input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요"
          onChange={onChangeHandler}
        />
      )}

      <p className="title">내용</p>
      <textarea
        placeholder="내용을 입력해주세요"
        name="content"
        readOnly={mode === "READ"}
        onChange={onChangeHandler}
      />

      {mode !== "READ" && (
        <button type="button" className="submit" onClick={todoHandler}>
          {mode === "CREATE" ? "생성" : "수정"}
        </button>
      )}
    </div>
  );
}
