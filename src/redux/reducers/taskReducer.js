import * as types from "../actions/actionTypes";
import initialState from "./initialState";

/* Since whatever is returned from the api will simply replace what was in our state,
all you have to do is return the tasks in the fetch action.
Remember, whatever you return from the reducer becomes the new state.  
*/
export default function taskReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case types.CREATE_TASK_SUCCESS:
      return [...state, { ...action.task }];
    case types.UPDATE_TASK_SUCCESS:
      return state.map(task =>
        task.id === action.task.id ? action.task : task
      );
    case types.FETCH_TASKS_SUCCESS:
      return action.tasks;
    case types.DELETE_TASK_OPTIMISTIC:
      // optimistic delete: just a quick filter to exclude relevant id
      return state.filter(task => task.id !== action.task.id);
    default:
      return state;
  }
}
