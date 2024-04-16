import { AppState } from "@/store";

export const selectProduct = (state: AppState) => state.product.data;
