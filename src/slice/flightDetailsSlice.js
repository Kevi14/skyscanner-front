import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    departure: '',
    arrival: '',
    price: null,
};

const flightDetailsSlice = createSlice({
    name: 'flightDetails',
    initialState,
    reducers: {
        setFlightDetails: (state, action) => {
            state.departure = action.payload.departure;
            state.arrival = action.payload.arrival;
            state.price = action.payload.price;
        },
        clearFlightDetails: () => initialState,
    },
});

export const { setFlightDetails, clearFlightDetails } = flightDetailsSlice.actions;
export default flightDetailsSlice.reducer;