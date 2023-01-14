import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const reducer = combineReducers({
  todoReducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
