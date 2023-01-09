import "../assets/css/error.css";
import { useNavigate } from "react-router-dom";

interface Props {
  message: string;
  onClickHandler?: () => void;
}

export default function Modal({ message, onClickHandler }: Props) {
  const navigate = useNavigate();

  const defaultHandler = () => {
    navigate(0);
  };

  return (
    <div className="error-container">
      <div className="error">
        <p>{message}</p>
        <button onClick={onClickHandler || defaultHandler}>확인</button>
      </div>
    </div>
  );
}
