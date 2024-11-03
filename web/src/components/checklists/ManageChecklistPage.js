/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */

// container component for adding and or editing checklists

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as checklistActions from "../../redux/actions/checklistActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as taskActions from "../../redux/actions/taskActions";
import ChecklistForm from "./ChecklistForm";
import { newChecklist, newTask } from "./newChecklist";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";

function ManageChecklistPage({ checklists, categories, history, ...props }) {
  const [checklist, setChecklist] = useState({ ...props.checklist });
  const [errors, setErrors] = useState({}); // initialize to empty object
  const [saving, setSaving] = useState(false);
  const [updatingChecklist, setUpdatingChecklist] = useState(false);
  const [updatingTasks, setUpdatingTasks] = useState(null)
  const [redirectAfterSave, setRedirectAfterSave] = useState(false);

  useEffect(() => {
    if (checklists.length === 0) {
      // only need access to entire task array to make sure it isn't empty
      props.actions.fetchChecklists().catch(error => {
        alert("Loading checklists failed" + error);
      });
    } else {
      //set checklist in local state to update when prop updates
      setChecklist({ ...props.checklist });
    }

    if (categories.length === 0) {
      props.actions.fetchCategories().catch(error => {
        alert("Loading categories failed" + error);
      });
    } // don't put unnecessary variables in the dependency array, screws up change-handler
  }, [props.actions, checklists.length, props.checklist, categories.length]);

  // centralized change-handler
  function handleChange(event, index) {
    const { name, value } = event.target; // retain local ref to event
    // will only apply to elements in the task array
    if (typeof index !== "undefined") {
      /* To copy array of objects, must use map and  {...notation}!!!
      to create a deep copy. If you only did a shallow copy, you are merely creating
      a new array that points to the original objects, which will result in you mutating state. 
      */
      const newTasks = checklist.tasks.map(task => {
        return { ...task };
      });
      newTasks[index][name] = value;
      setChecklist(prevChecklist => ({
        ...prevChecklist,
        tasks: newTasks
      }));
    } else {
      setChecklist(prevChecklist => ({
        ...prevChecklist, // needed to save previous changes between saves
        [name]: value
      }));
    }
  }

  function formIsValid() {
    const { title, tasks } = checklist;
    const errors = {};
    const titles = checklist.tasks.filter(task => {
      return task.title;
    });
    const categoryIds = checklist.tasks.filter(task => {
      return task.categoryId;
    });

    if (!title) errors.title = "Title is required.";
    if (tasks.length < 2) {
      errors.tasks = "Checklist must have at least 2 tasks.";
      alert(errors.tasks);
    }
    if (titles.length !== tasks.length) errors.titles = "Title is required.";
    if (categoryIds.length !== tasks.length)
      errors.categories = "Category is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSaveChecklist(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    props.actions
      .saveChecklist(checklist)
      .then((res) => {
        toast.success("Checklist saved.");
          // fetch checklists (in case checklist is new)
          props.actions
            .fetchChecklists()
      })
      .catch(error => {
        setErrors({ onSave: error.message });
      });
    setUpdatingChecklist(true)
  }

  useEffect(() => {
    if (saving && updatingChecklist && checklists.length > 0) {
    // grab checklist by title (in case it's new and didn't have an id)
    const uC = getChecklistByTitle(checklists, checklist.title)
      if (uC) {
        handleSaveTasks(uC)
      }
    }
  },[saving, updatingChecklist && checklists.length, checklist.title, checklists, handleSaveTasks, updatingChecklist])

  function handleSaveTasks(updatedChecklist) {
    for (const [index, task] of checklist.tasks.entries()) {
      if (!task.checklistId) {
        // checklist was new, give task new checklist's id and clear taskId so api knows to POST
        task.checklistId = updatedChecklist.id
        task.id = null
      }
        props.actions
          .saveTask(task)
          .then(res => {
            // trigger flag after last task
            if(index === checklist.tasks.length - 1) {
              setUpdatingTasks(true)
            }
          })
          .catch(error => {
            setErrors({ onSave: error.message });
          });
    }
  }

  useEffect(() => {
    if (saving && updatingChecklist && updatingTasks)
    props.actions
      .fetchChecklists()
      .then(res => {
          setRedirectAfterSave(true)
      })
      .catch(error => {
      setErrors({ onSave: error.message });
    });

    // Return a cleanup function
    return () => {
      setRedirectAfterSave(false);
    };

  },[saving, updatingChecklist, updatingTasks])

  useEffect(() => {
    if (saving && updatingChecklist && updatingTasks && redirectAfterSave) {
      // fetch to see refreshed data
      // history is passed in from react-router from <Route>
      history.push("/checklists"); // redirect to '/tasks' page
    }
  }, [saving, updatingChecklist, updatingTasks, redirectAfterSave, history, props.actions])

  function handleAddTask(event) {
    event.preventDefault();
    const newTasks = checklist.tasks.map(task => {
      return { ...task };
    });
    newTask.checklistId = checklist.id // add to this checklist
    newTasks.push(newTask); // insert empty task with no id (will be created when saving form)
    setChecklist(prevChecklist => ({
      ...prevChecklist,
      tasks: newTasks
    }));
  }

  function handleDeleteTask(event, index) {
    event.preventDefault();
    const newTasks = checklist.tasks.map(task => {
      return { ...task };
    });
    newTasks.splice(index, 1); // remove task
    setChecklist(prevChecklist => ({
      ...prevChecklist,
      tasks: newTasks
    }));
    const task = checklist.tasks[index]
    if (task.id) {
      // only delete tasks that have been saved
      props.actions
      .deleteTask(task)
      .then(() => {
        toast.success("Task deleted.");
      })
      .catch(error => {
        alert("Deleting tasks failed" + error);
      });
    }
  }

  if (!saving) {
    return (
      <>
        <div>
          <ChecklistForm
            checklist={checklist}
            tasks={checklist.tasks}
            categories={categories}
            handleAddTask={handleAddTask}
            handleDeleteTask={handleDeleteTask}
            errors={errors}
            onChange={handleChange}
            onSave={handleSaveChecklist}
            saving={saving}
          />
        </div>
      </>
    );
  }
   else {
    return <p>loading...</p>
   }

}

export function getChecklistById(checklists, id) {
  // return the checklist that matches the given id in url or return null
  return checklists.find(checklist => checklist.id == id) || null;
}

export function getChecklistByTitle(checklists, title) {
  // return the checklist that matches the given id in url or return null
  return checklists.find(checklist => checklist.title === title) || null;
}

// which parts of the state (DEPARTMENTS) to expose this component via props
function mapStateToProps(state, ownProps) {
  /* ownProps has routing related props from React Router, including URL data, i.e. id */
  const id = ownProps.match.params.id;
  const checklist =
    id && state.checklists.length > 0
      ? getChecklistById(state.checklists, id)
      : newChecklist; // post-backs w/ newCategory until category has loaded from id
  return {
    checklist,
    checklists: state.checklists,
    categories: state.categories
  };
}

/* must specify the type for each prop (from mapStateToProps above)
 */
ManageChecklistPage.propTypes = {
  checklist: PropTypes.object.isRequired,
  checklists: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

// which (forms) ACTOIN CREATORS are available to drop off to dispatch (form receiver/ bad mail man) on this component
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchChecklists: bindActionCreators(
        checklistActions.fetchChecklists,
        dispatch
      ),
      fetchCategories: bindActionCreators(
        categoryActions.fetchCategories,
        dispatch
      ),
      saveChecklist: bindActionCreators(
        checklistActions.saveChecklist,
        dispatch
      ),
      deleteTask: bindActionCreators(
        taskActions.deleteTask,
        dispatch
      ),
      saveTask: bindActionCreators(
        taskActions.saveTask,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageChecklistPage);
