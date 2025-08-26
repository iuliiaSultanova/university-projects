import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    authModal: modalReducer,
    userState: userReducer,
  },
});

export type AppStore = ReturnType<typeof store.getState>;;
