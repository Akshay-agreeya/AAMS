/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getMenuDetails, getUserRole, isSuperAdmin, menuPermissions } from '../utils/Helper';

import { USER_MENU } from '../utils/Constants';

const Navbar = () => {

  const [menuDetails, setMenuDetails] = useState([]);
  const permissions = getUserRole();
  const menu_permissions = getMenuDetails();
  const superAdmin = isSuperAdmin();


  const urlMapping = {
    dashboard: superAdmin ? '/admin/dashboard' : '/user/dashboard',
    user_management: '/admin/user-management',
    role_management: '/admin/role-management',
    product_permission: '/admin/product-permission',
    product_management: '/admin/product-management',
    reports: superAdmin ? '/admin/reports' : '/user/reports',
  }

  const getMenu = useCallback(async () => {
    try {

      // Extract just the permission IDs
      const menu = menuPermissions(menu_permissions, permissions)
      setMenuDetails(menu);
      localStorage.setItem(USER_MENU, JSON.stringify(menu));
    }
    catch (error) {
      console.log(error);
    }
  }, []);


  useEffect(() => {
    getMenu();
  }, [getMenu]);

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className={`nav-item ms-0`}>
        <NavLink
          className="nav-link"
          to={urlMapping["dashboard"]}
          end // Ensure exact match for this route
        >
          Dashboard
        </NavLink>
      </li>
      {menuDetails.map((item, index) => <li className={`nav-item`} key={index}>
        <NavLink
          className="nav-link"
          to={urlMapping[item.menu_detail_name?.replace(/ /g, '_').toLowerCase()]}>
          {item.menu_detail_name}
        </NavLink>
      </li>)}
    </ul>
  );
};

export default Navbar;
