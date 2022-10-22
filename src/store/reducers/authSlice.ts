import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";

export interface IAuthInitialState {
  isAuth: boolean;
  user: IUser;
  error: string;
}

const initialState: IAuthInitialState = {
  isAuth: false,
  user: {} as IUser,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.user = { username: "", password: "" };
      state.isAuth = false;
    },
    logIn: (state, action: PayloadAction<IUser>) => {
      if (
        action.payload.username === "user" &&
        action.payload.password === "12345"
      ) {
        state.user = action.payload;
        state.isAuth = true;
        state.error = "";
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("username", action.payload.username);
      } else {
        state.isAuth = false;
        state.error = "Неверный логин или пароль";
      }
    },
    auth: (state, action) => {
      state.isAuth = true;
    },
  },
});
export const { logOut, logIn, auth } = authSlice.actions;
export default authSlice.reducer;
