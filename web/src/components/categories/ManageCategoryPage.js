import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import { bindActionCreators } from "redux";
import CategoryForm from "./CategoryForm";
import newCategory from "./newCategory";
import { toast } from "react-toastify";

// need to load categories to make sure array isn't empty

function ManageCategoryPage({ categories, history, ...props }) {
  const [category, setCategory] = useState({ ...props.category }); // initialize to empty newCategory
  const [errors, setErrors] = useState({}); // initialize to empty object
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (categories.length === 0) {
      props.actions.fetchCategories().catch(error => {
        alert("Loading categories failed" + error);
      });
    } else {
      //set category in local state to update when prop updates
      setCategory({ ...props.category });
    }
  }, [props.category, props.actions, categories.length]);

  // centralized change-handler
  function handleChange(event) {
    const { name, value } = event.target; // retain local ref to event
    setCategory(prevCategory => ({
      ...prevCategory, // needed to save previous changes between saves
      [name]: value
    }));
  }

  function formIsValid() {
    const { name } = category;
    const errors = {};

    if (!name) errors.name = "Name is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    props.actions
      .saveCategory(category)
      .then(() => {
        // history is passed in from react-router from <Route>
        history.push("/categories"); // redirect to '/categories' page
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <>
      <CategoryForm
        category={category}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
}

export function getCategoryById(categories, id) {
  /* This is where we're getting the specific category to show/edit in teh form, from url.
  This returns the category that matches the given id in url or returns null
  */
  return categories.find(category => category.id == id) || null;
}

// which parts of the state (DEPARTMENTS) to expose this component via props
function mapStateToProps(state, ownProps) {
  /* ownProps has routing related props from React Router, including URL data, i.e. id */
  const id = ownProps.match.params.id; // this is how we get the id to grab the right category
  const category =
    id && state.categories.length > 0
      ? getCategoryById(state.categories, id)
      : newCategory; // post-backs w/ newCategory until category has loaded from id

  return {
    category,
    categories: state.categories
  };
}

/* must specify the type for each prop (from mapStateToProps above)
 */
ManageCategoryPage.propTypes = {
  category: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

// which (forms) ACTOIN CREATORS are available to drop off to dispatch (form receiver/ bad mail man) on this component
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      fetchCategories: bindActionCreators(
        categoryActions.fetchCategories,
        dispatch
      ),
      saveCategory: bindActionCreators(categoryActions.saveCategory, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCategoryPage);
