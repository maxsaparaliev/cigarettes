import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabase";
import { SUPABASE_TABLES } from "@/constants/constants";
import { setProduct } from "@/store/product/reducers";
import { TProductData } from "@/components/product-card/product-card";

export const getProduct = createAsyncThunk<
  void,
  { id: number },
  { rejectValue: Error }
>("product/get", async ({ id }, { rejectWithValue, dispatch }) => {
  try {
    if (!id) {
      return;
    }
    const { data, error } = await supabase
      .from(SUPABASE_TABLES.PRODUCTS)
      .select("*")
      .eq("id", id)
      .single();

    console.log(data, "AWAIT DATA");

    dispatch(setProduct(data as TProductData));
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});
