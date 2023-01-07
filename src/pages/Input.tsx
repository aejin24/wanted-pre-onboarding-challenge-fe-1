import "../assets/css/input.css";
import { useNavigate } from "react-router-dom";
import { MODE } from "../types/todo";

interface Props {
  mode: MODE;
}

export default function Input({ mode }: Props) {
  const navigate = useNavigate();

  return (
    <div className="wrapper">
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
        <input type="text" name="title" placeholder="제목을 입력해주세요" />
      )}

      <p className="title">내용</p>
      <textarea
        placeholder="내용을 입력해주세요"
        name="content"
        readOnly={mode === "READ"}
      />

      {mode !== "READ" && (
        <button type="button" className="submit">
          {mode === "CREATE" ? "생성" : "수정"}
        </button>
      )}
    </div>
  );
}
