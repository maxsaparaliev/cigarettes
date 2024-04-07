import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/store/index";

export const store = configureStore({
  reducer: rootReducer,
});
