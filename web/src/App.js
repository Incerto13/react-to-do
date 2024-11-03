import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import TasksPage from "./components/tasks/TasksPage";
import CategoriesPage from "./components/categories/CategoriesPage";
import ChecklistsPage from "./components/checklists/ChecklistsPage";
import HomePage from "./components/home/HomePage";
import ManageTaskPage from "./components/tasks/ManageTaskPage";
import ManageCategoryPage from "./components/categories/ManageCategoryPage";
import ManageChecklistPage from "./components/checklists/ManageChecklistPage";
import ChecklistViewPage from "./components/checklists/ChecklistViewPage";
import CompletedTasksPage from "./components/checklists/CompletedTasksPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/common/Header";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <div className=" app container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/tasks" component={TasksPage} />
        <Route exact path="/categories" component={CategoriesPage} />
        <Route exact path="/checklists" component={ChecklistsPage} />
        {/* id route needs to come first  */}
        <Route exact path="/task/:id" component={ManageTaskPage} />
        <Route exact path="/task" component={ManageTaskPage} />
        <Route exact path="/category/:id" component={ManageCategoryPage} />
        <Route exact path="/category" component={ManageCategoryPage} />
        <Route
          exact
          path="/checklist/view/:id"
          component={ChecklistViewPage}
        />
        <Route exact path="/checklist/:id" component={ManageChecklistPage} />
        <Route exact path="/checklist" component={ManageChecklistPage} />
        <Route exact path="/completed-tasks/" component={CompletedTasksPage} />
        {/* PageNotFound works automatically by placing it last within switch */}
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
