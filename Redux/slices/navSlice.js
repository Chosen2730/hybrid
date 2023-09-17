import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

//State slice
export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: ({ origin }, { payload }) => {
      origin = payload;
    },
    setDestination: ({ destination }, { payload }) => {
      destination = payload;
    },
    setTravelTimeInfo: ({ travelTimeInformation }, { payload }) => {
      travelTimeInformation = payload;
    },
  },
});

// Action creators are automatically generated for each case reducer function
export const { setDestination, setOrigin, setTravelTimeInfo } =
  navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTimeTravelInfo = (state) => state.nav.travelTimeInformation;

export default navSlice.reducer;
