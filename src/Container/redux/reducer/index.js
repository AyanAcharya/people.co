import { combineReducers } from "redux";
import { peopleCoReducers } from "./userReducer.js";

const reducers = combineReducers({
  allUsers: peopleCoReducers,
});
export default reducers;
