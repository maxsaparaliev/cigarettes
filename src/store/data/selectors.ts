import { AppState } from "@/store";

export const selectData = (state: AppState) => state.data.data;

export const selectCurrentPage = (state: AppState) => state.data.currentPage;
export const selectTotalPages = (state: AppState) => state.data.totalPages;
