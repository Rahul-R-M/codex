import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: JSON.parse(localStorage.getItem("Signupdata")) || [],
};
export const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    addAdminTask: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("Signupdata", JSON.stringify(state.admin));
    },
    deleteAdminTask: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("Signupdata", JSON.stringify(state.admin));
    },
    editAdminTask: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("Signupdata", JSON.stringify(state.admin));
    },
    filtersByStatus: (state, action) => {
      state.admin = action.payload;
    },
  },
});
export const { addAdminTask, deleteAdminTask, editAdminTask, filtersByStatus } =
  adminSlice.actions;
export default adminSlice.reducer;
