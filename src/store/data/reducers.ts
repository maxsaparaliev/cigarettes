import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProductData } from "@/components/product-card/product-card";

type DataReducer = {
  data: TProductData[] | null;
  currentPage: number;
  totalPages: number;
};

const initialState: DataReducer = {
  data: null,
  currentPage: 1,
  totalPages: 0,
};
export const dataReducer = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<TProductData[]>) {
      state.data = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});

export const { setData, setCurrentPage, setTotalPages } = dataReducer.actions;

export default dataReducer.reducer;
