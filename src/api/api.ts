import { PAGE_SIZE, SUPABASE_TABLES } from "@/constants/constants";
import { supabase } from "@/utils/supabase";
import { TSidebarItem } from "@/api/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { TProductData } from "@/components/product-card/product-card";

export const getManufacturers = async (): Promise<
  PostgrestSingleResponse<TSidebarItem[]>
> => {
  return supabase.from(SUPABASE_TABLES.MANUFACTURERS).select();
};

export const getCountries = async (): Promise<
  PostgrestSingleResponse<TSidebarItem[]>
> => {
  return supabase.from(SUPABASE_TABLES.COUNTRIES).select();
};

export const getProducts = async (
  page: number,
  order?: any,
): Promise<PostgrestSingleResponse<TProductData[]>> => {
  let query = supabase
    .from(SUPABASE_TABLES.products)
    .select("*", { count: "exact" })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  if (order) {
    query.order("price", { ascending: true });
  }
  return await query;
};
