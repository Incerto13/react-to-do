import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TaskList = props => {
  const { tasks, onCompletionToggle, onDeleteClick } = props;

  const completionToggleHandler = (event, task) => {
    onCompletionToggle(event, task)
  };

  if (tasks) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>Title</th>
            <th>Body</th>
            <th>Category</th>
            <th>Checklist</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => {
            return (
              <tr key={task.id}>
                <td></td>
                <td>
                  <Link to={"/task/" + task.id}>{task.title}</Link>
                </td>
                <td>{task.body}</td>
                <td>{task.categoryName}</td>
                <td>
                  <Link to={"/checklist/view/" + task.checklistId}>
                    {task.checklistTitle}
                  </Link>
                </td>
                <td>
                    <button
                      type="button"
                      className={
                        !task.completed
                          ? "btn btn-outline-success"
                          : "btn btn-success"
                      }
                      onClick={event => completionToggleHandler(event, task)}
                    >
                      {!task.completed ? "Incomplete" : "Completed"}
                    </button>
                  </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => onDeleteClick(task)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  else {
    return <p>loading...</p>
  }

};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default TaskList;
