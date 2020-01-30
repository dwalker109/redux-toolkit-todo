import { combineReducers } from "redux";
import todos from "./toDoSlice";
import filter from "./filterSlice";

export default combineReducers({
  todos,
  filter
});
