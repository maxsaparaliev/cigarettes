import { combineReducers } from "redux";
import dataReducer from "@/store/data/reducers";
import defaultReducer from "@/store/default/reducers";

export interface AppState {
  data: ReturnType<typeof dataReducer>;
  default: ReturnType<typeof defaultReducer>;
}

const rootReducer = combineReducers({
  data: dataReducer,
  default: defaultReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type

export default rootReducer;
