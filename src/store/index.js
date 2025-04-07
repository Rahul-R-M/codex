import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import userSlice from "./users/userSlice";
import adminSlice from "./admin/adminSlice";

export const store = configureStore({
  reducer: {
    Auth: authSlice,
    Users: userSlice,
    Admin: adminSlice,
  },
});
