import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabase";
import { PAGE_SIZE, SUPABASE_TABLES } from "@/constants/constants";
import { setData, setTotalPages } from "@/store/data/reducers";
import { TProductData } from "@/components/product-card/product-card";

export const getProducts = createAsyncThunk<
  void,
  { page: number; sorting?: any; filters?: any },
  { rejectValue: Error }
>(
  "products/get",
  async ({ page, sorting, filters }, { rejectWithValue, dispatch }) => {
    try {
      let query = supabase
        .from(SUPABASE_TABLES.products)
        .select("*", { count: "exact" })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

      console.log(sorting, "filterss");

      if (filters) {
        if (filters.manufacturer) {
          const PostGresManufacturerQuery = filters.manufacturer
            .map((item) => `"${item}"`)
            .join(",");
          console.log(
            `(${PostGresManufacturerQuery})`,
            "PostGresManufacturerQuery",
          );
          query = query.filter(
            "manufacturer",
            "in",
            `(${PostGresManufacturerQuery})`,
          );
        }
      }

      if (sorting) {
        query = query.order(sorting.column, {
          ascending: sorting.ascending,
        });
      }

      console.log(filters, "filters");

      const { data, count } = await query;

      dispatch(setData(data as TProductData[]));
      dispatch(setTotalPages(Math.ceil(count! / PAGE_SIZE)));
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);
