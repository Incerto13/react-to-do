import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as checklistActions from "../../redux/actions/checklistActions";
import { bindActionCreators } from "redux";
import TaskList from "./TaskList";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

/* Loads all tasks and gives option to edit/delete each one 
and a button to add a new task in the upper right corner */

class TasksPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hydratedTasks: null,
    };

    this.handleCompletionToggle = this.handleCompletionToggle.bind(this);
    this.hydrateTasks = this.hydrateTasks.bind(this);
  }

  componentDidMount() {
    this.props.actions.fetchTasks()
      .then(() => {
        this.props.actions.fetchCategories()
          .then(() => {
            this.props.actions.fetchChecklists()
              .catch(error => {
              alert("Loading checklists failed" + error);
            });
          })
          .catch(error => {
            alert("Loading categories failed" + error);
          });
      })
      .catch(error => {
        alert("Loading tasks failed" + error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // only if tasks, categories and checklists have been populated
    if (this.props.tasks.length > 0  && this.props.categories.length > 0 && this.props.checklists.length > 0 && this.state.loading) { 
      this.hydrateTasks()
    } 
  }

  hydrateTasks() {
    const hT = [];
    for (const task of this.props.tasks) {
      hT.push({
        ...task,
        categoryName: this.props.categories.find((category) => category.id == task.categoryId).name,
        checklistTitle: task.checklistId ? this.props.checklists.find((checklist) => checklist.id == task.checklistId).title : ''
      })
    }
    this.setState((prevState) => ({
      ...prevState,
      hydratedTasks: hT,
      loading: false
    }));
  }

  handleCompletionToggle(event, task) {
    let updatedTask
    const { id } = task;
    const index = this.state.hydratedTasks.findIndex(task => {
      return task.id === id;
    });
    const oldStatus = this.state.hydratedTasks[index].completed;
    const newTasks = this.state.hydratedTasks.map(task => {
      return { ...task }; // deep clone of tasks array
    });
    newTasks[index].completed = !oldStatus; // flip completion status
    // if now completed, record time, otherwise keep null
    if (!oldStatus === true) {
      newTasks[index].timeOfCompletion = Date.now();
      updatedTask = newTasks[index]
    } else {
      newTasks[index].timeOfCompletion = null;
      updatedTask = newTasks[index];
    }

    // update hydratedTasks
    this.setState((prevState) => ({
      ...prevState,
      hydratedTasks: newTasks,
    }));

    this.props.actions
      .saveTask(updatedTask)
      .then(() => {
        toast.success("Task updated.");
      })
      .catch(error => {
        alert("Loading checklists failed" + error);
      });
  }

  handleDeleteTask = task => {
    // don't allow delete if checklist.tasks.length <= 2
    if (task.checklistId) {
      const checklist = this.props.checklists.find((checklist) => checklist.id == task.checklistId)
      if (checklist.tasks.length <= 2) {
        alert("Checklist must have at least 2 tasks. Delete checklist to remove all tasks.");
        return
      }
    }
    toast.success("Task deleted.");
    // optimistic delete ~ remove task from UI before API call completes
    this.props.actions.deleteTask(task)
      .then(() => {
        this.hydrateTasks();
      })
      .catch(error => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  };

  render() {
    if (!this.state.loading) {
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
            onCompletionToggle={this.handleCompletionToggle}
            tasks={this.state.hydratedTasks}
          ></TaskList>
        </>
      );
    }
     else {
      return <p>loading...</p>
     }
  }
}

// which parts of the state (DEPARTMENTS) to expose this component via props
function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    categories: state.categories,
    checklists: state.checklists,
  };
}

/* must specify the type for each prop (from mapStateToProps above)
 */
TasksPage.propTypes = {
  categories: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  checklists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// which (forms) ACTOIN CREATORS are available to drop off to dispatch (form receiver/ bad mail man) on this component
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchTasks: bindActionCreators(taskActions.fetchTasks, dispatch),
      fetchCategories: bindActionCreators(
        categoryActions.fetchCategories,
        dispatch
      ),
      fetchChecklists: bindActionCreators(
        checklistActions.fetchChecklists,
        dispatch
      ),
      deleteTask: bindActionCreators(taskActions.deleteTask, dispatch),
      saveTask: bindActionCreators(taskActions.saveTask,
        dispatch
      ),
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksPage);
