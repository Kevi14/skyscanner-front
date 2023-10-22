import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departure: "",
  selectedDate: "",
  arrival: "",
  price: null,
  discountedPrice: "",
};

const flightDetailsSlice = createSlice({
  name: "flightDetails",
  initialState,
  reducers: {
    setFlightDetails: (state, action) => {
      state.departure = action.payload.departure;
      state.selectedDate = action.payload.selectedDate;
      state.arrival = action.payload.arrival;
      state.price = action.payload.price;
      state.discountedPrice = action.payload.discountedPrice;
    },
    clearFlightDetails: () => initialState,
  },
});

export const { setFlightDetails, clearFlightDetails } =
  flightDetailsSlice.actions;
export default flightDetailsSlice.reducer;
