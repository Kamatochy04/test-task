import { createSlice } from "@reduxjs/toolkit";
import { City } from "types/city";
import { cityApi } from "./api/cityApi";

interface CityState {
  cities: City[];
}

const initialState: CityState = {
  cities: [],
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      cityApi.endpoints.getCities.matchFulfilled,
      (state, action) => {
        state.cities = action.payload;
      }
    );
  },
});

export const {} = citySlice.actions;
export default citySlice.reducer;
