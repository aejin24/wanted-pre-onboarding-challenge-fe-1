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
      <div className="header">
        To Do
        <img
          src="/images/plus.png"
          alt="추가하기"
          onClick={() => navigate("/write")}
          className="plus"
        />
      </div>

      <Todo />
      <Todo />
      <Todo />
    </div>
  );
}
