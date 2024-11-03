import * as types from "./actionTypes";
import * as taskApi from "../../api/taskApi";

// These are ACTION CREATORS for the task reducer (department) of the store

// returns entire array of tasks
export function fetchTasks() {
  return function(dispatch) {
    return taskApi
      .getTasks()
      .then(tasks => {
        // separate action creator for successfull api call
        dispatch({ type: types.FETCH_TASKS_SUCCESS, tasks: tasks });
      })
      .catch(error => {
        throw error;
      });
  };
}


/* this method creates one of two potential actions on a conditional basis
 either update or create depending on if there's already an id
*/
export function saveTask(task) {
  return function(dispatch, getState) {
    return taskApi
      .saveTask(task)
      .then(savedTask => {
        task.id
          ? dispatch({ type: types.UPDATE_TASK_SUCCESS, task: savedTask })
          : dispatch({ type: types.CREATE_TASK_SUCCESS, task: savedTask });
      })
      .catch(error => {
        throw error;
      });
  };
}

// TODO: delete
// export function updateTasks(tasks) {
//   return function(dispatch, getState) {
//     return taskApi
//       .updateTasks(tasks)
//       .then(updatedTasks => {
//           dispatch({ type: types.UPDATE_TASKS_SUCCESS, tasks: updatedTasks });
//       })
//       .catch(error => {
//         throw error;
//       });
//   };
// }

export function deleteTask(task) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch({ type: types.DELETE_TASK_OPTIMISTIC, task });
    return taskApi.deleteTask(task.id);
  };
}
