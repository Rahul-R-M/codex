import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: JSON.parse(localStorage.getItem("Signupdata")) || [],
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUserTask: (state, action) => {
      state.users = action.payload;
      localStorage.setItem("Signupdata", JSON.stringify(state.users));
    },
    editUserTask: (state, action) => {
      state.users = action.payload;
      localStorage.setItem("Signupdata", JSON.stringify(state.users));
    },
    deleteUserTask: (state, action) => {
      state.users = action.payload;
      localStorage.setItem("Signupdata", JSON.stringify(state.users));
    },
  },
});

export const { addUserTask, editUserTask, deleteUserTask } = userSlice.actions;

export default userSlice.reducer;
