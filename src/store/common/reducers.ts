import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TSidebarItem } from "@/api/types";

interface CommonState {
  manufacturers: TSidebarItem[] | null;
  countries: TSidebarItem[] | null;
  strength: TSidebarItem[] | null;
}

// Define the initial state
const initialState: CommonState = {
  manufacturers: null,
  countries: null,
  strength: null,
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
    setStrength(state, action: PayloadAction<TSidebarItem[]>) {
      state.strength = action.payload;
    },
  },
});
export const { setManufacturers, setCountries, setStrength } = commonReducer.actions;

export default commonReducer.reducer;
