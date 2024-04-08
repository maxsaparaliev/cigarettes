import { AppState } from "@/store";

export const selectCountries = (state: AppState) => state.common.countries;

export const selectManufacturers = (state: AppState) =>
  state.common.manufacturers;
