import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ITodoResponse } from "../types/todo";

const { persistAtom } = recoilPersist({
  key: "persistAtom",
  storage: window.sessionStorage,
});

const todoAtom = atom<ITodoResponse[]>({
  key: "todoAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export { todoAtom };
