import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const CategoryForm = ({
  category,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{category.id ? "Edit" : "Add"} Category</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={category.name}
        onChange={onChange}
        error={errors.name}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

CategoryForm.propTypes = {
  category: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default CategoryForm;
