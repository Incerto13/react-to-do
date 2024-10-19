import * as types from "../actions/actionTypes";
import initialState from "./initialState";

/* Since whatever is returned from the api will simply replace what was in our state,
all you have to do is return the tasks in the fetch action.
Remember, whatever you return from the reducer becomes the new state.  
*/
export default function categoryReducer(
  state = initialState.categories,
  action
) {
  switch (action.type) {
    case types.CREATE_CATEGORY_SUCCESS:
      return [...state, { ...action.category }];
    case types.UPDATE_CATEGORY_SUCCESS:
      return state.map(category =>
        category.id === action.category.id ? action.category : category
      );
    case types.FETCH_CATEGORIES_SUCCESS:
      return action.categories;
    case types.DELETE_CATEGORY_OPTIMISTIC:
      // optimistic delete: just a quick filter to exclude relevant id
      return state.filter(category => category.id !== action.category.id);
    default:
      return state;
  }
}
