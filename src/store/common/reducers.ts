import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSidebarItem } from "@/api/types";

interface CommonState {
  manufacturers: TSidebarItem[] | null;
  countries: TSidebarItem[] | null;
}

// Define the initial state
const initialState: CommonState = {
  manufacturers: null,
  countries: null,
};

export const commonReducer = createSlice({
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
export const { setManufacturers, setCountries } = commonReducer.actions;

export default commonReducer.reducer;
