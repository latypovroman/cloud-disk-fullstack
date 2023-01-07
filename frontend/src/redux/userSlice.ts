import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
