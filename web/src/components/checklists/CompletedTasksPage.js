import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as checklistActions from "../../redux/actions/checklistActions";
import { bindActionCreators } from "redux";
import CompletedTaskList from "./CompletedTaskList";

/* Loads all checklists and gives option to edit/delete each one 
and a button to add a new task in the upper right corner */

function CompletedTasksPage({ checklists, ...props }) {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    if (checklists.length === 0) {
      props.actions.fetchChecklists().catch(error => {
        alert("Loading checklists failed" + error);
      });
    } else {
      // set checklist in local state to update when prop updates
      const newCompletedTasks = [];
      for (let checklist of checklists) {
        for (let task of checklist.tasks) {
          if (task.completed === true) {
            newCompletedTasks.push({
              checklistId: checklist.id,
              checklistTitle: checklist.title,
              checklistSlug: checklist.slug,
              taskId: task.id,
              taskTitle: task.title,
              body: task.body,
              category: task.category,
              timeOfCompletion: task.timeOfCompletion
            });
          }
        }
      }

      newCompletedTasks.sort((a, b) => {
        return b.timeOfCompletion - a.timeOfCompletion;
      });

      setCompletedTasks(newCompletedTasks);
    }
  }, [checklists, checklists.length, props.actions, props.checklists]);

  return (
    <>
      <h2>Completed Tasks</h2>

      <CompletedTaskList completedTasks={completedTasks}></CompletedTaskList>
    </>
  );
}

// which parts of the state (DEPARTMENTS) to expose this component via props
function mapStateToProps(state) {
  return {
    checklists: state.checklists
  };
}

/* must specify the type for each prop (from mapStateToProps above)
 */
CompletedTasksPage.propTypes = {
  checklists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// which (forms) ACTOIN CREATORS are available to drop off to dispatch (form receiver/ bad mail man) on this component
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchChecklists: bindActionCreators(
        checklistActions.fetchChecklists,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTasksPage);
