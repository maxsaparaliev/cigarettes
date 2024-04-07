import { AppState } from "@/store";

export const selectCountries = (state: AppState) => state.default.countries;

export const selectManufacturers = (state: AppState) =>
  state.default.manufacturers;
