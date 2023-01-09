export type MODE = "REGISTER" | "LOGIN";

export interface IAuth {
  email: string;
  password: string;
  mode?: MODE;
}

export interface IResponse {
  message?: string;
  token?: string;
  details?: string;
}