import { combineReducers } from "redux";
import dataReducer from "@/store/data/reducers";
import commonReducer from "@/store/common/reducers";

export interface AppState {
  data: ReturnType<typeof dataReducer>;
  common: ReturnType<typeof commonReducer>;
}

const rootReducer = combineReducers({
  data: dataReducer,
  common: commonReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type

export default rootReducer;
