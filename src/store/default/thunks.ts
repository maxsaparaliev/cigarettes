import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabase";
import { SUPABASE_TABLES } from "@/constants/constants";
import { setCountries, setManufacturers } from "@/store/default/reducers";
import { TSidebarItem } from "@/api/types";

export const getManufacturers = createAsyncThunk<
  void,
  void,
  { rejectValue: Error }
>("default/getManufacturers", async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await supabase
      .from(SUPABASE_TABLES.MANUFACTURERS)
      .select();
    dispatch(setManufacturers(response.data as TSidebarItem[]));
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const getCountries = createAsyncThunk<
  void,
  void,
  { rejectValue: Error }
>("default/getCountries", async (_, { dispatch, rejectWithValue }) => {
  try {
    const response = await supabase.from(SUPABASE_TABLES.COUNTRIES).select();
    dispatch(setCountries(response.data as TSidebarItem[]));
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});
