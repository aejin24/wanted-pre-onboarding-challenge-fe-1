import "../assets/css/list.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../components";

export default function List() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <div className="wrapper">
      <div className="title">
        To Do
        <img
          src="/images/plus.png"
          alt="추가하기"
          onClick={() => navigate("/write")}
        />
      </div>

      <Todo />
      <Todo />
      <Todo />
    </div>
  );
}
