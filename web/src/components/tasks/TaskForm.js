import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

/* This form handles Adding and Editing an existing form based
on whether or not there is an id present
*/

const TaskForm = ({
  task,
  categories,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {

  return (
    <form onSubmit={onSave}>
      <h2>{task.id ? "Edit" : "Add"} Task</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        value={task.title}
        onChange={onChange}
        error={errors.title}
      />

      <SelectInput
        name="categoryId"
        label="Category"
        value={task.categoryId}
        defaultOption="Select Category"
        options={categories.map(category => ({
          value: category.id,
          text: category.name
        }))}
        onChange={onChange}
        error={errors.categoryId}
      />

      <TextInput
        name="body"
        label="Body"
        value={task.body}
        onChange={onChange}
        error={errors.body}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  categories: PropTypes.array.isRequired,
  task: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default TaskForm;
