import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as checklistActions from "../../redux/actions/checklistActions";
import { bindActionCreators } from "redux";
import ChecklistList from "./ChecklistList";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

/* Loads all checklists and gives option to edit/delete each one 
and a button to add a new task in the upper right corner */

class ChecklistsPage extends Component {
  componentDidMount() {
    this.props.actions.fetchChecklists().catch(error => {
      alert("Loading checklists failed" + error);
    });
  }

  handleDeleteChecklist = checklist => {
    toast.success("Checklist deleted.");
    // optimistic delete ~ remove checklist from UI before API call completes
    this.props.actions.deleteChecklist(checklist).catch(error => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  };

  render() {
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
          checklists={this.props.checklists}
        ></ChecklistList>
      </>
    );
  }
}

// which parts of the state (DEPARTMENTS) to expose this component via props
function mapStateToProps(state) {
  return {
    checklists: state.checklists
  };
}

/* must specify the type for each prop (from mapStateToProps above)
 */
ChecklistsPage.propTypes = {
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
      ),
      deleteChecklist: bindActionCreators(
        checklistActions.deleteChecklist,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistsPage);
