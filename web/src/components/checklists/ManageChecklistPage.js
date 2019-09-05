// container component for adding and or editing checklists

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as checklistActions from "../../redux/actions/checklistActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import ChecklistForm from "./ChecklistForm";
import { newChecklist, newTask } from "./newChecklist";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";

function ManageChecklistPage({ checklists, categories, history, ...props }) {
  const [checklist, setChecklist] = useState({ ...props.checklist });
  const [errors, setErrors] = useState({}); // initialize to empty object
  const [saving, setSaving] = useState(false);

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
    const categories = checklist.tasks.filter(task => {
      return task.category;
    });

    if (!title) errors.title = "Title is required.";
    if (tasks.length < 2) {
      errors.tasks = "Checklist must have at least 2 tasks.";
      alert(errors.tasks);
    }
    if (titles.length !== tasks.length) errors.titles = "Title is required.";
    if (categories.length !== tasks.length)
      errors.categories = "Category is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    props.actions
      .saveChecklist(checklist)
      .then(() => {
        console.log(checklist);
        toast.success("Checklist saved.");
        // history is passed in from react-router from <Route>
        history.push("/checklists"); // redirect to '/tasks' page
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function handleAddTask(event) {
    event.preventDefault();
    const newTasks = checklist.tasks.map(task => {
      return { ...task };
    });

    const taskIds = newTasks
      .map(task => {
        return task.id;
      })
      .sort();
    const newId = taskIds[taskIds.length - 1] + 1; // increment max current index by 1
    console.log("newId: ", newId);
    newTask.id = newId;
    newTasks.push(newTask); // insert empty task
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
  }

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
          onSave={handleSave}
          saving={saving}
        />
      </div>
    </>
  );
}

export function getChecklistBySlug(checklists, slug) {
  // return the checklist that matches the given slug in url or return null
  return checklists.find(checklist => checklist.slug === slug) || null;
}

// which parts of the state (DEPARTMENTS) to expose this component via props
function mapStateToProps(state, ownProps) {
  /* ownProps has routing related props from React Router, including URL data, i.e. slug */
  const slug = ownProps.match.params.slug;
  const checklist =
    slug && state.checklists.length > 0
      ? getChecklistBySlug(state.checklists, slug)
      : newChecklist; // post-backs w/ newCategory until category has loaded from slug
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
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageChecklistPage);
