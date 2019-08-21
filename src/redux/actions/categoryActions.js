import * as types from "./actionTypes";
import * as categoryApi from "../../api/categoryApi";

// These are ACTION CREATORS for the category reducer (department) of the store

// returns entire array of categories
export function fetchCategories() {
  return function(dispatch) {
    return categoryApi
      .getCategories()
      .then(categories => {
        // separate action creator for successfull api call
        dispatch({
          type: types.FETCH_CATEGORIES_SUCCESS,
          categories: categories
        });
      })
      .catch(error => {
        throw error;
      });
  };
}

/* Action Creator Steps: 
   1) API IS CALLED TO UPDATE THE DB WITH NEW/UPDATED OBJECT ~ (UPDATE THE DB)
   2) THEN THE ACTION IS CREATED AND SENT VIA DISPATCH TO THE REDUCER ~ (UPDATE INTERNAL STATE)

this method creates one of two potential actions on a conditional basis
 either update or create depending on if there's already an id
*/
export function saveCategory(category) {
  return function(dispatch, getState) {
    return categoryApi
      .saveCategory(category)
      .then(savedCategory => {
        category.id
          ? dispatch({
              type: types.UPDATE_CATEGORY_SUCCESS,
              category: savedCategory
            })
          : dispatch({
              type: types.CREATE_CATEGORY_SUCCESS,
              category: savedCategory
            });
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteCategory(category) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch({ type: types.DELETE_CATEGORY_OPTIMISTIC, category });
    return categoryApi.deleteCategory(category.id);
  };
}
