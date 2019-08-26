import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
Moment.globalTimezone = "America/New_York";

// Note, tasks within checklists are un-related to standalone tasks module

const CompletedTaskList = props => {
  const { completedTasks } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Body</th>
          <th>Category</th>
          <th>Completed</th>
          <th>Checklist</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {completedTasks.map((task, index) => {
          return (
            <tr key={index}>
              <td></td>
              <td>{task.taskTitle}</td>
              <td>{task.body}</td>
              <td>{task.category}</td>
              <td>
                <Moment format="MM/DD/YYYY h:mma">
                  {task.timeOfCompletion}
                </Moment>
              </td>
              <td>
                <Link to={"/checklist/view/" + task.checklistSlug}>
                  {task.checklistTitle}
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CompletedTaskList.propTypes = {
  completedTasks: PropTypes.array.isRequired
};

export default CompletedTaskList;
