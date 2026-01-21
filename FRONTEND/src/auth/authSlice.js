import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user");
const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  accessToken: tokenFromStorage || null,
  role: userFromStorage
    ? JSON.parse(userFromStorage)?.role?.toUpperCase()
    : null,
  initialized: true, // 🔥 ADD THIS
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.user.role.toUpperCase();

      // 🔐 persist
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.accessToken);
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.role = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
