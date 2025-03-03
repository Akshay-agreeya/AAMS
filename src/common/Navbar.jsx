import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUserRole } from '../utils/Helper';

const Navbar = () => {

  const user_role = getUserRole();
  

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item ms-0">
        <NavLink
          className="nav-link"
          to="/admin/dashboard"
          end // Ensure exact match for this route
        >
          Dashboard
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/user-management">
          User Management
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/role-management">
          Role Management
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/product-permission">
          Product Permission
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/product-management">
          Product Management
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/admin/reports">
          Reports
        </NavLink>
      </li>
    </ul>
  );
};

export default Navbar;
