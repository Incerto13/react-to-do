import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function checklistReducer(
  state = initialState.checklists,
  action
) {
  switch (action.type) {
    case types.CREATE_CHECKLIST_SUCCESS:
      return [...state, { ...action.checklist }];
    case types.UPDATE_CHECKLIST_SUCCESS:
      return state.map(checklist =>
        checklist.id === action.checklist.id ? action.checklist : checklist
      );
    case types.FETCH_CHECKLISTS_SUCCESS:
      return action.checklists;
    case types.DELETE_CHECKLIST_OPTIMISTIC:
      return state.filter(checklist => checklist.id !== action.checklist.id);
    default:
      return state;
  }
}
