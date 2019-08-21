import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import { bindActionCreators } from "redux";
import TaskForm from "./TaskForm";
import newTask from "./newTask";
import { toast } from "react-toastify";

/* This is the Controller Component for the TaskForm component,
this component only truly needs to load one single task at a time
*/

function ManageTaskPage({ tasks, categories, history, ...props }) {
  const [task, setTask] = useState({ ...props.task }); // initialize to empty newTask
  const [errors, setErrors] = useState({}); // initialize to empty object
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (tasks.length === 0) {
      // only need access to entire task array to make sure it isn't empty
      props.actions.fetchTasks().catch(error => {
        alert("Loading tasks failed" + error);
      });
    } else {
      //set task in local state to update when prop updates
      setTask({ ...props.task });
    }

    if (categories.length === 0) {
      props.actions.fetchCategories().catch(error => {
        alert("Loading categories failed" + error);
      });
    }
  }, [props.task, categories.length, props.actions, tasks.length]);
  // centralized change-handler
  function handleChange(event) {
    const { name, value } = event.target; // retain local ref to event
    setTask(prevTask => ({
      ...prevTask, // needed to save previous changes between saves
      [name]: value
    }));
  }

  function formIsValid() {
    const { title, category } = task;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!category) errors.category = "Category is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    props.actions
      .saveTask(task)
      .then(() => {
        console.log(task);
        toast.success("Task saved.");
        // history is passed in from react-router from <Route>
        history.push("/tasks"); // redirect to '/tasks' page
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <>
      <TaskForm
        task={task}
        errors={errors}
        categories={categories}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
}

export function getTaskBySlug(tasks, slug) {
  // return the task that matches the given slug in url or return null
  return tasks.find(task => task.slug === slug) || null;
}

// which parts of the state (DEPARTMENTS) to expose this component via props
function mapStateToProps(state, ownProps) {
  /* ownProps has routing related props from React Router, including URL data, i.e. slug */
  const slug = ownProps.match.params.slug;
  const task =
    slug && state.tasks.length > 0 ? getTaskBySlug(state.tasks, slug) : newTask;

  return {
    task,
    tasks: state.tasks,
    categories: state.categories
  };
}

/* must specify the type for each prop (from mapStateToProps above)
 */
ManageTaskPage.propTypes = {
  task: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
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
      saveTask: bindActionCreators(taskActions.saveTask, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTaskPage);
