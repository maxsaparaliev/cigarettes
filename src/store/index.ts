import { combineReducers } from "redux";
import dataReducer from "@/store/data/reducers";
import commonReducer from "@/store/common/reducers";
import basketReducer from "@/store/basket/reducers";

export interface AppState {
  data: ReturnType<typeof dataReducer>;
  common: ReturnType<typeof commonReducer>;
  basket: ReturnType<typeof basketReducer>;
}

const rootReducer = combineReducers({
  data: dataReducer,
  common: commonReducer,
  basket: basketReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type

export default rootReducer;
