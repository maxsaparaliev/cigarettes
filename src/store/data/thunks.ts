import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabase";
import { PAGE_SIZE, SUPABASE_TABLES } from "@/constants/constants";
import { setData, setTotalPages } from "@/store/data/reducers";
import { TProductData } from "@/components/product-card/product-card";
import { TSidebarFilters } from "@/components/sidebar/sidebar";
import { formatPostgresQuery } from "@/utils/formatPostgresQuery";

export const getProducts = createAsyncThunk<
  void,
  { page: number; sorting?: any; filters?: TSidebarFilters },
  { rejectValue: Error }
>(
  "products/get",
  async ({ page, sorting, filters }, { rejectWithValue, dispatch }) => {
    try {
      let query = supabase
        .from(SUPABASE_TABLES.products)
        .select("*", { count: "exact" })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

      if (filters) {
        if (filters.manufacturer.length) {
          query = query.filter(
            "manufacturer",
            "in",
            `(${formatPostgresQuery(filters.manufacturer)})`,
          );
        }
        if (filters.country.length) {
          query = query.filter(
            "country",
            "in",
            `(${formatPostgresQuery(filters.country)})`,
          );
        }
        if (filters.minPrice) {
          query.gte("price", filters.minPrice);
        }
        if (filters.maxPrice) {
          query.lte("price", filters.maxPrice);
        }
      }

      if (sorting) {
        query = query.order(sorting.column, {
          ascending: sorting.ascending,
        });
      }

      const { data, count } = await query;

      dispatch(setData(data as TProductData[]));
      dispatch(setTotalPages(Math.ceil(count! / PAGE_SIZE)));
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  },
);
