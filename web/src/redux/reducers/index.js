import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import categoryReducer from "./categoryReducer";
import checklistReducer from "./checklistReducer";

// just a combination of all the reducers into one object
const rootReducer = combineReducers({
  tasks: taskReducer, // better to name the key 'tasks' here for later prop use
  categories: categoryReducer,
  checklists: checklistReducer
});

export default rootReducer;
