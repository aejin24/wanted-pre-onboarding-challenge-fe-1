import { ITodoResponse } from "../types/todo";
import { Axios } from "./base";

const getTodos = async (): Promise<ITodoResponse[]> => {
  const res = await Axios.get("/todos");

  return res.data.data;
};

const getTodo = async (id: string): Promise<ITodoResponse> => {
  const res = await Axios.get(`/todos/${id}`);

  return res.data.data;
};

export { getTodos, getTodo };
