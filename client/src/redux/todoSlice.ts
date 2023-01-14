import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoResponse } from "../types/todo";

const initialState = [] as ITodoResponse[];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    RAddTodo: (state, action: PayloadAction<ITodoResponse[]>) => {
      return [...state, ...action.payload];
    },
    RDeleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter((t) => t.id !== action.payload);
    },
    RUpdateTodo: (state, action: PayloadAction<ITodoResponse>) => {
      const targetIdx = state.findIndex((s) => s.id === action.payload.id);

      state[targetIdx] = { ...action.payload };

      return state;
    },
  },
});

export const { RAddTodo, RDeleteTodo, RUpdateTodo } = todoSlice.actions;
export default todoSlice.reducer;
