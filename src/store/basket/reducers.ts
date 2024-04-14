import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProductData } from "@/components/product-card/product-card";
import { CONDITIONS, LOCALSTORAGE_KEYS } from "@/constants/constants";

export type THandleAmount = Pick<BasketData, "id"> & {
  condition: string;
};

export type BasketData = {
  amount: number;
} & TProductData;

type BasketReducer = {
  data: BasketData[];
};
const initialState: BasketReducer = {
  data: [],
};
export const basketReducer = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket(state, action: PayloadAction<BasketData>) {
      const item = state.data.find((item) => item.id === action.payload.id);
      if (!item) {
        state.data = [...state.data, action.payload];
        localStorage.setItem(
          LOCALSTORAGE_KEYS.ITEMS,
          JSON.stringify(state.data),
        );
      }
    },
    handleAmount(state, action: PayloadAction<THandleAmount>) {
      const { id, condition } = action.payload;
      const product = state.data.find((item) => item.id === id);
      if (product) {
        let amount = product.amount;
        condition === CONDITIONS.PLUS ? amount++ : amount--;
        if (amount >= 0) {
          product.amount = amount;
        }
      }
    },
    getBasketData(state, action: PayloadAction<Array<BasketData> | string>) {
      if (Array.isArray(action.payload)) {
        state.data = [...action.payload];
      }
    },
  },
});

export const { addToBasket, getBasketData, handleAmount } =
  basketReducer.actions;
export default basketReducer.reducer;
