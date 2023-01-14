import "../assets/css/list.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loading, Modal, Todo } from "../components";
import { useQuery } from "react-query";
import { getTodos } from "../services/queries";
import { getErrorMessage } from "../utils";

export default function List() {
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    isError,
    data: todos,
  } = useQuery(["todos"], getTodos);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div className="wrapper">
      {isLoading && <Loading />}

      {isError && <Modal message={getErrorMessage(error)} />}

      <div className="header">
        To Do
        <img
          src="/images/plus.png"
          alt="추가하기"
          onClick={() => navigate("/write")}
          className="plus"
        />
      </div>

      {isLoading ? <div /> : <Todo todos={todos!} />}
    </div>
  );
}
