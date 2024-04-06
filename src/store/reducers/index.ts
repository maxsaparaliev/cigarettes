import { combineReducers } from "redux";
import counterReducer from "@/store/reducers/reducers";

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
