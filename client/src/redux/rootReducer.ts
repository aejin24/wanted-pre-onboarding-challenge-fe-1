import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage/session";
import todoReducer from "./todoSlice";

const reducer = combineReducers({
  todoReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["todoReducer"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export type ReducerType = ReturnType<typeof persistedReducer>;
export default persistedReducer;
