import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  firstName: null,
  lastName: null,
};

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
    setUserInfo: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const { setLoggedIn, setLoggedOut, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
