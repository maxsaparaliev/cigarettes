import { AppState } from "@/store";

export const selectBasketData = (state: AppState) => state.basket.data;
