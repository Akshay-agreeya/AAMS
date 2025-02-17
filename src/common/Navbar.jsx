import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item ms-0">
        <NavLink
          className="nav-link"
          to="/admin/dashboard"
          end // Ensure exact match for this route
          activeClassName="active"
        >
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/user-management" activeClassName="active">
          User Management
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/role-management" activeClassName="active">
          Role Management
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/product-permission" activeClassName="active">
          Product Permission
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/product-management" activeClassName="active">
          Product Management
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/reports" activeClassName="active">
          Reports
        </NavLink>
      </li>
    </ul>
  );
};

export default Navbar;
