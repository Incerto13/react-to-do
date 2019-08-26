import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { bindActionCreators } from "redux";
import CategoryList from "./CategoryList";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class CategoriesPage extends Component {
  componentDidMount() {
    this.props.actions.fetchCategories().catch(error => {
      alert("Loading categories failed" + error);
    });
  }

  handleDeleteCategory = category => {
    toast.success("Category deleted.");
    // optimistic delete ~ remove category from UI before API call completes
    this.props.actions.deleteCategory(category).catch(error => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  };

  render() {
    return (
      <>
        <h2>Categories</h2>

        <Link to={"/category/"}>
          <button
            style={{ marginBottom: 20 }}
            className="btn btn-primary add-task"
          >
            Add Category
          </button>
        </Link>

        <CategoryList
          onDeleteClick={this.handleDeleteCategory}
          categories={this.props.categories}
        ></CategoryList>
      </>
    );
  }
}

// which parts of the state (DEPARTMENTS) to expose this component via props
function mapStateToProps(state) {
  return {
    categories: state.categories // need access to categories reducer to do mapping above
  };
}

/* must specify the type for each prop (from mapStateToProps above)
 */
CategoriesPage.propTypes = {
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// which (forms) ACTOIN CREATORS are available to drop off to dispatch (form receiver/ bad mail man) on this component
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchCategories: bindActionCreators(
        categoryActions.fetchCategories,
        dispatch
      ),
      deleteCategory: bindActionCreators(
        categoryActions.deleteCategory,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesPage);
