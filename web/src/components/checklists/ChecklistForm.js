import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import "./ChecklistForm.css";

/* This form handles Adding and Editing an existing form based
on whether or not there is an id present
*/

const ChecklistForm = ({
  checklist,
  tasks,
  categories,
  handleAddTask,
  handleDeleteTask,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form className="body" onSubmit={onSave}>
      <h2>{checklist.id ? "Edit" : "Add"} Checklist</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}

      <TextInput
        name="title"
        label="Checklist Title"
        value={checklist.title}
        onChange={onChange}
        error={errors.title}
      />

      <h3>Tasks</h3>
      {tasks.map((task, index) => {
        return (
          <div className="task" key={task.id}>
            <div>
              <div className="index-num"># {index}</div>
              <div>
                <button
                  className="delete-task-button btn btn-danger btn-lg"
                  type="button"
                  onClick={event => handleDeleteTask(event, index)}
                >
                  -
                </button>
              </div>
              <TextInput
                name="title"
                label="Title"
                value={task.title}
                onChange={event => onChange(event, index)}
                error={errors.titles}
              />

              <TextInput
                name="body"
                label="Body"
                value={task.body}
                onChange={event => onChange(event, index)}
                error={errors.body}
              />

              <SelectInput
                name="category"
                label="Category"
                value={task.category}
                defaultOption="Select Category"
                options={categories.map(category => ({
                  value: category.name,
                  text: category.name
                }))}
                onChange={event => onChange(event, index)}
                error={errors.categories}
              />
            </div>
          </div>
        );
      })}

      <button
        className="btn btn-info btn-lg add-task-button"
        type="button"
        onClick={handleAddTask}
      >
        +
      </button>

      <button
        type="submit"
        disabled={saving}
        className="save-button btn btn-primary"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

ChecklistForm.propTypes = {
  categories: PropTypes.array.isRequired,
  checklist: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default ChecklistForm;
