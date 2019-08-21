import React from "react";
import CompletedTasksPage from "../checklists/CompletedTasksPage";

const HomePage = () => (
  <>
    <div className="jumbotron">
      <h1>Akin's (Redux) To-Do App</h1>
      <p>There are to-do apps and then there are to-do apps...</p>
    </div>
    <CompletedTasksPage />
  </>
);

export default HomePage;
