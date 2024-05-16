import { AppState } from "@/store";

export const selectCountries = (state: AppState) => state.common.countries;

export const selectStrength = (state: AppState) => state.common.strength;

export const selectManufacturers = (state: AppState) =>
  state.common.manufacturers;
