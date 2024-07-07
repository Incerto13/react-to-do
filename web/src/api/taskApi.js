import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.REACT_APP_TO_DO_DOMAIN_SERVER + "/tasks/";

export function getTasks() {
  // fetch defaults to "GET" method
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveTask(task) {
  return fetch(baseUrl + (task.id || ""), {
    method: task.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(task)
  })
    .then(handleResponse)
    .catch(handleError);
}

// Redux-THunk  = Async Middleware
/* with thunk you don't have to pass dispatch or state as arguments
they are injected for us by the thunk middleware 
without thunk, the signatures of these methods would differ depending on 
whether or not they were synchronous or asynchronous */
export function deleteTask(taskId) {
  return fetch(baseUrl + taskId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
