import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CategoryList = props => {
  const { categories, onDeleteClick } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {categories.map(category => {
          return (
            <tr key={category.id}>
              <td></td>
              <td>
                <Link to={"/category/" + category.slug}>{category.name}</Link>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDeleteClick(category)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default CategoryList;
