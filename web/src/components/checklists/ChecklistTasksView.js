import React from "react";
import PropTypes from "prop-types";


function ChecklistTasksView(props) {
  const { tasks, onCompletionToggle } = props;

  const completionToggleHandler = (event, task) => {
    onCompletionToggle(event, task)
  };


  if (tasks.length > 0) {
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
                  <td>{task.categoryName}</td>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else {
    return <p>loading...</p>
  }


};

ChecklistTasksView.propTypes = {
  tasks: PropTypes.array.isRequired,
  onCompletionToggle: PropTypes.func.isRequired
};

export default ChecklistTasksView;
