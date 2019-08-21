import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Note, tasks within checklists are un-related to standalone tasks module

const ChecklistList = props => {
  const { checklists, onDeleteClick } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Tasks</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {checklists.map(checklist => {
          return (
            <tr key={checklist.id}>
              <td></td>
              <td>
                <Link to={"/checklist/view/" + checklist.slug}>
                  {checklist.title}
                </Link>
              </td>
              <td>
                {checklist.tasks.slice(0, 3).map(task => {
                  return (
                    <ul key={task.title}>
                      <li>{task.title}</li>
                    </ul>
                  );
                })}
              </td>
              <td>
                {checklist.tasks.slice(0, 3).map(task => {
                  return (
                    <ul style={{ listStyleType: "none" }} key={task.title}>
                      <li>{task.category}</li>
                    </ul>
                  );
                })}
              </td>

              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(checklist)}
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

ChecklistList.propTypes = {
  checklists: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default ChecklistList;
