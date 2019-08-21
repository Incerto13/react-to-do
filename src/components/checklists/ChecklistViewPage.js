// THIS PAGE IS FOR CHECKING OFF TASKS (as completed) ON A CHECKLIST (THAT IS ALL!!!)

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as checklistActions from "../../redux/actions/checklistActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import ChecklistTasksView from "./ChecklistTasksView";
import newChecklist from "./newChecklist";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ManageChecklistPage({ checklists, categories, history, ...props }) {
  const [checklist, setChecklist] = useState({ ...props.checklist }); // initialize to empty newTask
  const [errors, setErrors] = useState({}); // initialize to empty object

  useEffect(() => {
    if (checklists.length === 0) {
      // only need access to entire task array to make sure it isn't empty
      props.actions.fetchChecklists().catch(error => {
        alert("Loading checklists failed" + error);
      });
    } else {
      //set checklist in local state to update when prop updates
      setChecklist({ ...props.checklist });
      // setSortedTasks({ ...props.checklist.tasks });
    }

    if (categories.length === 0) {
      props.actions.fetchCategories().catch(error => {
        alert("Loading categories failed" + error);
      });
    }
  }, [
    checklist,
    props.actions,
    checklists.length,
    props.checklist,
    categories.length
  ]);

  function handleTaskToggle(event, task) {
    const { id } = task;
    const index = checklist.tasks.findIndex(task => {
      return task.id === id;
    });
    const oldStatus = checklist.tasks[index].completed;
    const newTasks = checklist.tasks.map(task => {
      return { ...task }; // deep clone of tasks array
    });
    newTasks[index].completed = !oldStatus; // flip completion status
    // if now completed, record time, otherwise keep null
    if (!oldStatus === true) {
      newTasks[index].timeOfCompletion = Date.now();
    } else {
      newTasks[index].timeOfCompletion = null;
    }
    setChecklist(prevChecklist => ({
      ...prevChecklist,
      tasks: newTasks
    }));
    props.actions
      // need to save updated checklist, setChecklist won't update in time
      .saveChecklist({ ...checklist, tasks: newTasks })
      .then(() => {
        toast.success("Task updated.");
        // fetch again after save to allor re-sort
        props.actions.fetchChecklists().catch(error => {
          alert("Loading checklists failed" + error);
        });
      })
      .catch(error => {
        setErrors({ onSave: error.message });
      });
  }

  return (
    <>
      <div>
        <h2>{checklist.title}</h2>

        <Link to={"/checklist/" + checklist.slug}>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-task"
          >
            Edit Checklist
          </button>
        </Link>

        <ChecklistTasksView
          tasks={checklist.tasks}
          onTaskToggle={handleTaskToggle}
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
