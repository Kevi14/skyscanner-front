// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isAuthenticated: false,
    },
    reducers: {
        setAuthToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        clearAuthToken: (state) => {
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setAuthToken, clearAuthToken } = authSlice.actions;

export default authSlice.reducer;
