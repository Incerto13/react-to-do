import * as types from "./actionTypes";
import * as checklistApi from "../../api/checklistApi";

// These are ACTION CREATORS for the checklist reducer (department) of the store

export function resetData() {
  return { type: types.RESET_DATA}
}


// ensures that each time we fetch checklists, they will be sorted
function sortChecklistTasks(checklists) {
  for (let checklist of checklists) {
    checklist.tasks.sort((a, b) => {
      // sort by: completed (false first), then timeOfCompletion
      return (
        (a.completed === b.completed ? 0 : a.completed ? 1 : -1) ||
        a.timeOfCompletion - b.timeOfCompletion
      );
    });
  }
  return checklists;
}

// returns entire array of checklists
export function fetchChecklists() {
  return function(dispatch) {
    return checklistApi
      .getChecklists()
      .then(checklists => {
        /* sort after api call but before delivering to reducer,
         will be pre-sorted before appearing on any page */
        const sortedChecklists = sortChecklistTasks(checklists);
        // only call dispatch once you know it was a successfull api call
        dispatch({
          type: types.FETCH_CHECKLISTS_SUCCESS,
          checklists: sortedChecklists
        });
      })
      .catch(error => {
        throw error;
      });
  };
}

/* this method creates one of two potential actions on a conditional basis
 either update or create depending on if there's already an id
*/
export function saveChecklist(checklist) {
  return function(dispatch, getState) {
    return checklistApi
      .saveChecklist(checklist)
      .then(savedChecklist => {
        checklist.id
          ? dispatch({
              type: types.UPDATE_CHECKLIST_SUCCESS,
              checklist: savedChecklist
            })
          : dispatch({
              type: types.CREATE_CHECKLIST_SUCCESS,
              checklist: savedChecklist
            });
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteChecklist(checklist) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch({ type: types.DELETE_CHECKLIST_OPTIMISTIC, checklist });
    return checklistApi.deleteChecklist(checklist.id);
  };
}

// export function addTask(checklist) {
//   return function(dispatch) {
//     dispatch({ type: types.ADD_CHECKLIST_TASK_OPTIMISTIC });
//     return checklistApi.addTask(checklist);
//   };
// }
