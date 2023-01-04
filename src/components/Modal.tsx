import "../assets/css/error.css";
import { useNavigate } from "react-router-dom";

interface Props {
  message: string;
}

export default function Modal ({ message }: Props) {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error">
        <p>{message}</p>
        <button onClick={() => { navigate(0); }}>확인</button>
      </div>
    </div>
  );
}