/* Only reason this is in a separate file is to 
take advantage of code-completion in the IDE
*/

export const RESET_DATA = "RESET_DATA";

export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";

// batch actions
// export const CREATE_TASKS_SUCCESS = "CREATE_TASKS_SUCCESS";
export const UPDATE_TASKS_SUCCESS = "UPDATE_TASKS_SUCCESS";

export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";

export const FETCH_CHECKLISTS_SUCCESS = "FETCH_CHECKLISTS_SUCCESS";
export const UPDATE_CHECKLIST_SUCCESS = "UPDATE_CHECKLIST_SUCCESS";
export const CREATE_CHECKLIST_SUCCESS = "CREATE_CHECKLIST_SUCCESS";

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
export const DELETE_TASK_OPTIMISTIC = "DELETE_TASK_OPTIMISTIC";
export const DELETE_CATEGORY_OPTIMISTIC = "DELETE_CATEGORY_OPTIMISTIC";
export const DELETE_CHECKLIST_OPTIMISTIC = "DELETE_CHECKLIST_OPTIMISTIC";

