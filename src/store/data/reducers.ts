import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProductData } from "@/components/product-card/product-card";
import { getProducts } from "@/store/data/thunks";

type DataReducer = {
  data: TProductData[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
};

const initialState: DataReducer = {
  data: [],
  currentPage: 1,
  totalPages: 0,
  loading: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setData, setCurrentPage, setTotalPages } = dataReducer.actions;

export default dataReducer.reducer;
