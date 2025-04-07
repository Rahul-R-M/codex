import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuth: JSON.parse(localStorage.getItem('isAuth')) || false,
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        isAuthentication: (state, action) => {
            state.isAuth = action.payload
        }
    }
})

export const { isAuthentication } = authSlice.actions

export default authSlice.reducer;