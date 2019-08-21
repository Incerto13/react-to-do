import React from "react";
import PropTypes from "prop-types";

// Note, tasks within checklists are different and un-related to standalone tasks module

const ChecklistTasksView = props => {
  const { tasks, onTaskToggle } = props;

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Task</th>
            <th>Body</th>
            <th>Category</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr key={task.id}>
                <td></td>
                <td>{task.title}</td>
                <td>{task.body}</td>
                <td>{task.category}</td>
                <td>
                  <button
                    type="button"
                    className={
                      !task.completed
                        ? "btn btn-outline-success"
                        : "btn btn-success"
                    }
                    onClick={event => onTaskToggle(event, task)}
                  >
                    {!task.completed ? "Incomplete" : "Completed"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

ChecklistTasksView.propTypes = {
  tasks: PropTypes.array.isRequired,
  onTaskToggle: PropTypes.func.isRequired
};

export default ChecklistTasksView;
