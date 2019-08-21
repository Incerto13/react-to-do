import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/tasks" activeStyle={activeStyle}>
        Tasks
      </NavLink>
      {" | "}
      <NavLink to="/categories" activeStyle={activeStyle}>
        Categories
      </NavLink>
      {" | "}
      <NavLink to="/checklists" activeStyle={activeStyle}>
        Checklists
      </NavLink>
      {" | "}
      <NavLink to="/completed-tasks" activeStyle={activeStyle}>
        Completed Tasks
      </NavLink>
    </nav>
  );
};

export default Header;
