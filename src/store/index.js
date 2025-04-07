import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import userSlice from "./users/userSlice";

export const store = configureStore({
    reducer:{
        Auth: authSlice,
        Users:userSlice,
    }
})