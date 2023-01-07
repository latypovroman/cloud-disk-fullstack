import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  isAuth: false,
};

export const fileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = fileSlice.actions;
export default fileSlice.reducer;
