import { configureStore } from "@reduxjs/toolkit";

// reducers
import loginReducer from "../components/Login/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
