import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSidebarItem } from "@/api/types";

interface DefaultState {
  manufacturers: TSidebarItem[] | null;
  countries: TSidebarItem[] | null;
}

// Define the initial state
const initialState: DefaultState = {
  manufacturers: null,
  countries: null,
};

export const defaultReducer = createSlice({
  name: "default",
  initialState,
  reducers: {
    setManufacturers(state, action: PayloadAction<TSidebarItem[]>) {
      state.manufacturers = action.payload;
    },
    setCountries(state, action: PayloadAction<TSidebarItem[]>) {
      state.countries = action.payload;
    },
  },
});
export const { setManufacturers, setCountries } = defaultReducer.actions;

export default defaultReducer.reducer;
