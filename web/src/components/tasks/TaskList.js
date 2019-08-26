import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TaskList = props => {
  const { tasks, onDeleteClick } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Body</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => {
          return (
            <tr key={task.id}>
              <td></td>
              <td>
                <Link to={"/task/" + task.slug}>{task.title}</Link>
              </td>
              <td>{task.body}</td>
              <td>{task.category}</td>
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
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default TaskList;
