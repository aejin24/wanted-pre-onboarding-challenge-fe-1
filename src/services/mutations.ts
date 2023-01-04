import { IAuth, IResponse } from "../types/auth"
import { Axios } from "./base"

const auth = async ({ mode, email, password }: IAuth): Promise<IResponse> => {
  const res = await Axios.post(`/users/${mode === "LOGIN" ? "login" : "create"}`, { email, password });

  return res.data;
}

export { auth }