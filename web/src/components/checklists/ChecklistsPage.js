/* eslint-disable eqeqeq */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as checklistActions from "../../redux/actions/checklistActions";
import * as categoryActions from "../../redux/actions/categoryActions";
import { bindActionCreators } from "redux";
import ChecklistList from "./ChecklistList";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

/* Loads all checklists and gives option to edit/delete each one 
and a button to add a new task in the upper right corner */

class ChecklistsPage extends Component {
  
constructor(props) {
  super(props);
  this.state = {
    loading: true,
    hydratedChecklists: null
  };
  this.hydrateChecklists = this.hydrateChecklists.bind(this);
}

  componentDidMount() {
    // this.props.actions.resetData();
    this.props.actions.fetchChecklists()
      .then(() => {
          this.props.actions.fetchCategories()
          .catch(error => {
            alert("Loading categories failed" + error);
        });
      })
  }

  componentDidUpdate(prevProps, prevState) {
    // only if checklist and categories have been populated
    if (this.props.checklists.length > 0 && this.props.categories.length > 0 && this.state.loading) { 
      this.hydrateChecklists()
    } 
  }

  hydrateChecklists() {
    const hC = [];
    for (const checklist of this.props.checklists) {
        const hT = [];
        for (const task of checklist.tasks) {
            hT.push({
              ...task,
              categoryName: this.props.categories.find((category) => category.id == task.categoryId).name
            })
        }
        hC.push({
          id: checklist.id,
          title: checklist.title,
          tasks: hT
        })
    }
    this.setState((prevState) => ({
      ...prevState,
      hydratedChecklists: hC,
      loading: false
    }));
  }

  handleDeleteChecklist = checklist => {
    toast.success("Checklist deleted.");
    // optimistic delete ~ remove checklist from UI before API call completes
    this.props.actions.deleteChecklist(checklist)
      .then(() => {
        this.hydrateChecklists()
      })
      .catch(error => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  };

  render() {
    if (!this.state.loading) {
      return (
        <>
          <h2>Checklists</h2>
  
          <Link to={"/checklist/"}>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-task"
            >
              Add Checklist
            </button>
          </Link>
  
          <ChecklistList
            onDeleteClick={this.handleDeleteChecklist}
            checklists={this.state.hydratedChecklists}
          ></ChecklistList>
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
    resetData: state.initialState,
    checklists: state.checklists,
    categories: state.categories
  };
}

/* must specify the type for each prop (from mapStateToProps above)
 */
ChecklistsPage.propTypes = {
  checklists: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// which (forms) ACTOIN CREATORS are available to drop off to dispatch (form receiver/ bad mail man) on this component
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      resetData: bindActionCreators(
        checklistActions.resetData,
        dispatch
      ),
      fetchChecklists: bindActionCreators(
        checklistActions.fetchChecklists,
        dispatch
      ),
      deleteChecklist: bindActionCreators(
        checklistActions.deleteChecklist,
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
)(ChecklistsPage);
