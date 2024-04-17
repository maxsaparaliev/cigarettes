import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProductData } from "@/components/product-card/product-card";

type DataReducer = {
  data: TProductData | null;
};

const initialState: DataReducer = {
  data: null,
};
export const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<TProductData>) {
      state.data = action.payload;
    },
  },
});

export const { setProduct } = productReducer.actions;

export default productReducer.reducer;
