/* eslint-disable eqeqeq */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as taskActions from "../../redux/actions/taskActions";
import * as checklistActions from "../../redux/actions/checklistActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import { bindActionCreators } from "redux";
import CompletedTaskList from "./CompletedTaskList";


function CompletedTasksPage({ tasks, checklists, categories, ...props }) {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0 || checklists.length === 0 || categories.length === 0) {
      props.actions.fetchTasks()
        .then(() => {
          props.actions.fetchChecklists()
          .then(() => {
            props.actions.fetchCategories()
              .catch(error => {
                alert("Loading categories failed" + error);
              })
            })
            .catch(error => {
            alert("Loading checklists failed" + error);
          });
        })
        .catch(error => {
          alert("Loading tasks failed" + error);
        });
    } else {
      // set checklist in local state to update when prop updates
      const newCompletedTasks = [];
      for (let task of tasks) {
        if (task.completed === true) {
          newCompletedTasks.push({
            ...task,
            checklistTitle: task.checklistId ? checklists.find((checklist) => checklist.id == task.checklistId).title : '',
            categoryName: categories.find((category) => category.id == task.categoryId).name,
            timeOfCompletion: task.timeOfCompletion
          });
        }
      }

      newCompletedTasks.sort((a, b) => {
        return b.timeOfCompletion - a.timeOfCompletion;
      });

      setCompletedTasks(newCompletedTasks);
    }
  }, [checklists, checklists.length, props.actions, props.checklists, categories, tasks]);

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
    tasks: state.tasks,
    checklists: state.checklists,
    categories: state.categories
  };
}

/* must specify the type for each prop (from mapStateToProps above)
 */
CompletedTasksPage.propTypes = {
  tasks: PropTypes.array.isRequired,
  checklists: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// which (forms) ACTOIN CREATORS are available to drop off to dispatch (form receiver/ bad mail man) on this component
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchTasks: bindActionCreators(
        taskActions.fetchTasks,
        dispatch
      ),
      fetchChecklists: bindActionCreators(
        checklistActions.fetchChecklists,
        dispatch
      ),
      fetchCategories: bindActionCreators(
        categoryActions.fetchCategories,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedTasksPage);
