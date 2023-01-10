import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type UserAuth = {
  email: string;
  password: string;
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ email, password }: UserAuth) => {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    return response.data;
  }
);

export const authUser = createAsyncThunk("user/authUser", async () => {
  const response = await axios.get("http://localhost:5000/api/auth/auth", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
});

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface currentUserData {
  id: number;
  email: string;
  diskSpace: number;
  usedSpace: number;
  avatarURL: string;
}

interface UserData {
  currentUser: currentUserData | {};
  status: Status | "";
  isAuth: boolean;
}

const initialState: UserData = {
  currentUser: {},
  status: "",
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.currentUser = {};
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = Status.LOADING;
      state.currentUser = {};
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.currentUser = action.payload.user;
      state.isAuth = true;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = Status.ERROR;
      state.currentUser = {};
      console.log("Failed to fetch user");
    });
    builder.addCase(authUser.pending, (state) => {
      state.status = Status.LOADING;
      state.currentUser = {};
    });
    builder.addCase(authUser.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.currentUser = action.payload.user;
      state.isAuth = true;
    });
    builder.addCase(authUser.rejected, (state) => {
      state.status = Status.ERROR;
      state.currentUser = {};
      console.log("Authorization error");
      localStorage.removeItem("token");
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
