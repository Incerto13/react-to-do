import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
// import * as categoryActions from "../../redux/actions/categoryActions"; --> DELETE
import { bindActionCreators } from "redux";
import TaskList from "./TaskList";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

/* Loads all tasks and gives option to edit/delete each one 
and a button to add a new task in the upper right corner */

class TasksPage extends Component {
  componentDidMount() {
    this.props.actions.fetchTasks().catch(error => {
      alert("Loading tasks failed" + error);
    });
  }

  handleDeleteTask = task => {
    toast.success("Task deleted.");
    // optimistic delete ~ remove task from UI before API call completes
    this.props.actions.deleteTask(task).catch(error => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  };

  render() {
    return (
      <>
        <h2>Tasks</h2>

        <Link to={"/task/"}>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-task"
          >
            Add Task
          </button>
        </Link>

        <TaskList
          onDeleteClick={this.handleDeleteTask}
          tasks={this.props.tasks}
        ></TaskList>
      </>
    );
  }
}

// which parts of the state (DEPARTMENTS) to expose this component via props
function mapStateToProps(state) {
  return {
    tasks: state.tasks
    // categories: state.categories // ****DELETE?????
  };
}

/* must specify the type for each prop (from mapStateToProps above)
 */
TasksPage.propTypes = {
  // categories: PropTypes.array.isRequired, // ***** DELETE????
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// which (forms) ACTOIN CREATORS are available to drop off to dispatch (form receiver/ bad mail man) on this component
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchTasks: bindActionCreators(taskActions.fetchTasks, dispatch),
      // fetchCategories: bindActionCreators(
      //   categoryActions.fetchCategories,
      //   dispatch
      // ), // *** DELETE????????
      deleteTask: bindActionCreators(taskActions.deleteTask, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksPage);
