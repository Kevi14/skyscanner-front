// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'booking',
    initialState: {
        departure: null,
        arrival: null,
        departureDate: null
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
