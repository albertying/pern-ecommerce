import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authorized: false,
  email: "",
  name: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { login, logout, setUserEmail, setUserName } = loginSlice.actions;

export default loginSlice.reducer;
