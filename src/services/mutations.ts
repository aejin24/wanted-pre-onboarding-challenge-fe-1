import { IAuth, IResponse } from "../types/auth";
import { ITodo } from "../types/todo";
import { Axios } from "./base";

const auth = async ({ mode, email, password }: IAuth): Promise<IResponse> => {
  const res = await Axios.post(
    `/users/${mode === "LOGIN" ? "login" : "create"}`,
    { email, password }
  );

  return res.data;
};

const createTodo = async ({ title, content }: ITodo): Promise<IResponse> => {
  const res = await Axios.post("/todos", { title, content });

  return res.data.data;
};

const updateTodo = async ({
  id,
  title,
  content,
}: ITodo): Promise<IResponse> => {
  const res = await Axios.put(`/todos/${id}`, { title, content });

  return res.data.data;
};

const deleteTodo = async (id: string): Promise<null> => {
  const res = await Axios.delete(`/todos/${id}`);

  return res.data;
};

export { auth, createTodo, updateTodo, deleteTodo };
