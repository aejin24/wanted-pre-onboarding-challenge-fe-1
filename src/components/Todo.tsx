import { useNavigate } from "react-router-dom";

export default function Todo() {
  const navigate = useNavigate();

  return (
    <div className="todo-wrapper">
      <p className="todo" onClick={() => navigate("/detail/1")}>
        집가기
      </p>

      <div className="todo-options">
        <img
          src="/images/edit.png"
          alt="수정하기"
          onClick={() => navigate("/update/1")}
        />
        <img src="/images/trash.png" alt="삭제하기" />
      </div>
    </div>
  );
}
