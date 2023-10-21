import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedTab: 'userData'
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setSelectedTab: (state, action) => {
            state.selectedTab = action.payload;
        },
    },
});

export const { setSelectedTab } = profileSlice.actions;
export default profileSlice.reducer;
