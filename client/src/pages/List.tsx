import "../assets/css/list.css";
import { useNavigate } from "react-router-dom";
import { Todo } from "../components";
import { Loading, Modal } from "../components/common";
import { useQuery } from "react-query";
import { getTodos } from "../services/queries";
import { getErrorMessage } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RAddTodo } from "../redux/todoSlice";
import { ReducerType } from "../redux/rootReducer";
import { ITodoResponse } from "../types/todo";

export default function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const todos = useSelector<ReducerType, ITodoResponse[]>(
    (state) => state.todoReducer
  );

  const { isLoading, error, isError } = useQuery(["todos"], async () => {
    const data = await getTodos();

    if (todos.length === 0) {
      dispatch(RAddTodo(data));
    }
  });

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

      {todos.length === 0 ? <div /> : <Todo todos={todos!} />}
    </div>
  );
}
