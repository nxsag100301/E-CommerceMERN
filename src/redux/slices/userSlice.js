import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userInfo: (state, action) => {
            const { name, email } = action.payload;
            state.name = name
            state.email = email
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.name = ''
            state.email = ''
            state.isLoggedIn = false
        }
    },
});

// Action creators are generated for each case reducer function
export const { userInfo, logout } = userSlice.actions;

export default userSlice.reducer;
