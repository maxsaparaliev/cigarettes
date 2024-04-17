import { combineReducers } from "redux";
import dataReducer from "@/store/data/reducers";
import commonReducer from "@/store/common/reducers";
import basketReducer from "@/store/basket/reducers";
import productReducer from "@/store/product/reducers";

export interface AppState {
  data: ReturnType<typeof dataReducer>;
  common: ReturnType<typeof commonReducer>;
  basket: ReturnType<typeof basketReducer>;
  product: ReturnType<typeof productReducer>;
}

const rootReducer = combineReducers({
  data: dataReducer,
  common: commonReducer,
  basket: basketReducer,
  product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
