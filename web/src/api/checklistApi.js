import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:8110/checklists/";

export function getChecklists() {
  // fetch defaults to "GET" method
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveChecklist(checklist) {
  return fetch(baseUrl + (checklist.id || ""), {
    method: checklist.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(checklist)
  })
    .then(handleResponse)
    .catch(handleError);
}

// Redux-THunk  = Async Middleware
/* with thunk you don't have to pass dispatch or state as arguments
they are injected for us by the thunk middleware 
without thunk, the signatures of these methods would differ depending on 
whether or not they were synchronous or asynchronous */
export function deleteChecklist(checklistId) {
  return fetch(baseUrl + checklistId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
