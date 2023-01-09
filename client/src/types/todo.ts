export type MODE = "CREATE" | "UPDATE" | "READ";

export interface ITodo {
  id?: string;
  title: string;
  content: string;
}

export interface ITodoResponse extends ITodo {
  createdAt: string;
  updatedAt: string;
}
