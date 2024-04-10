import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProductData } from "@/components/product-card/product-card";
import { LOCALSTORAGE_KEYS } from "@/constants/constants";

type BasketReducer = {
  data: TProductData[];
};
const initialState: BasketReducer = {
  data:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(LOCALSTORAGE_KEYS.ITEMS) || "") || []
      : [] || [],
};
export const basketReducer = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket(state, action: PayloadAction<TProductData>) {
      const item = state.data.find((item) => item.id === action.payload.id);
      if (!item) {
        state.data = [...state.data, action.payload];
        localStorage.setItem(
          LOCALSTORAGE_KEYS.ITEMS,
          JSON.stringify(state.data),
        );
      }
    },
  },
});

export const { addToBasket } = basketReducer.actions;
export default basketReducer.reducer;
