import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    avatar: '',
    phone: '',
    address: '',
    isLoggedIn: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userInfo: (state, action) => {
            const { name, email, avatar, phone, address } = action.payload;
            state.name = name
            state.email = email
            state.avatar = avatar
            state.phone = phone
            state.address = address
            state.isLoggedIn = true
        },
        logout: (state) => {
            state.name = ''
            state.email = ''
            state.avatar = ''
            state.phone = ''
            state.address = ''
            state.isLoggedIn = false
        },

    },
});

// Action creators are generated for each case reducer function
export const { userInfo, logout } = userSlice.actions;

export default userSlice.reducer;