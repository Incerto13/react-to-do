/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */


import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as checklistActions from "../../redux/actions/checklistActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as taskActions from "../../redux/actions/taskActions";
import ChecklistTasksView from "./ChecklistTasksView";
import newChecklist from "./newChecklist";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ChecklistViewPage({ checklists, categories, history, ...props }) {
  const [checklist, setChecklist] = useState({ ...props.checklist }); // initialize to empty newTask
  const [setErrors] = useState({}); // initialize to empty object
  const [loading, setLoading] = useState(true);
  const [hydratedTasks, setHydratedTasks] = useState(null)


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
      props.actions.fetchCategories()
        .then(respnose => console.log(respnose))
        .catch(error => {
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

  useEffect(() => {
    // checklist and categories have been populated
    if (checklist.tasks[0].categoryId && categories.length > 0 && loading) {
      const hT = [];
      for (const task of checklist.tasks) {
        hT.push({
          ...task,
          categoryName: categories.find((category) => category.id == task.categoryId).name
        })
      }
      setHydratedTasks(hT)
      setLoading(false)
    }
  },[checklist.tasks, checklist.tasks[0].categoryId, categories.length, loading, categories])

  function handleCompletionToggle(event, task) {
    let updatedTask
    const { id } = task;
    const index = hydratedTasks.findIndex(task => {
      return task.id === id;
    });
    const oldStatus = hydratedTasks[index].completed;
    const newTasks = hydratedTasks.map(task => {
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

    const updatedHydratedTasks = hydratedTasks;
    updatedHydratedTasks[index] = updatedTask;
    setHydratedTasks(updatedHydratedTasks);

    props.actions
      // need to save updated checklist, setChecklist won't update in time
      .saveChecklist({ ...checklist })
      .then(() => {
        props.actions
          .saveTask(updatedTask)
          .then(() => {
            toast.success("Task updated.");
            // fetch again after save to allor re-sort
            props.actions.fetchChecklists()
            .catch(error => {
              alert("Loading checklists failed" + error);
            });
          })
      })
      .catch(error => {
        setErrors({ onSave: error.message });
      });
  }



  if (loading) {
    return <p>loading...</p>
  }
  if (!loading) {
    return (
      <>
        <div>
          <h2>{checklist.title}</h2>
  
          <Link to={"/checklist/" + checklist.id}>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-task"
            >
              Edit Checklist
            </button>
          </Link>
  
          <ChecklistTasksView
            tasks={hydratedTasks}
            onCompletionToggle={handleCompletionToggle}
          />
        </div>
      </>
    );
  }
}

export function getChecklistById(checklists, id) {
  // get the checklist that matches the given id in url or return null
  return checklists.find(checklist => checklist.id == id) || null;
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
ChecklistViewPage.propTypes = {
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
      saveTask: bindActionCreators(taskActions.saveTask, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistViewPage);
