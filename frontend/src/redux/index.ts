import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import fileSlice from "./fileSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    fileSlice,
    userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
