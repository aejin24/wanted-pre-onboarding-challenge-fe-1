import "../assets/css/list.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading, Modal, Todo } from "../components";
import { useMutation, useQuery } from "react-query";
import { getTodos } from "../services/queries";
import { getErrorMessage } from "../utils";
import { deleteTodo } from "../services/mutations";

export default function List() {
  const navigate = useNavigate();
  const { isLoading, error, isError, data } = useQuery(["todos"], getTodos);
  const deleteMutation = useMutation(deleteTodo);

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

      {deleteMutation.isSuccess && (
        <Modal
          message="삭제 성공"
          onClickHandler={() => {
            navigate(0);
          }}
        />
      )}

      <div className="header">
        To Do
        <img
          src="/images/plus.png"
          alt="추가하기"
          onClick={() => navigate("/write")}
          className="plus"
        />
      </div>

      {data?.map((d) => (
        <Todo key={d.id} todo={d} mutate={deleteMutation.mutate} />
      ))}
    </div>
  );
}
