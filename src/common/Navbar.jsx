/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getMenuDetails, getUserRole, getUserRoleKey, gotoPath, isSuperAdmin, menuPermissions } from '../utils/Helper';

import { USER_MENU, USER_ROLE_KEY } from '../utils/Constants';

const Navbar = () => {

  const [menuDetails, setMenuDetails] = useState([]);
  const permissions = getUserRole();
  const menu_permissions = getMenuDetails();


  const urlMapping = {
    dashboard: gotoPath(getUserRoleKey()),
    user_management: '/user-management',
    role_management: '/role-management',
    product_management: '/product-management',
    product_permission: '/product-permission',
    reports: '/reports',
    pdf: '/PDFcrawler',
    pdfcrawler:'/PDFcrawler',
    
    my_product: '/myproduct'
  }

  const getMenu = useCallback(async () => {
    try {

      // Extract just the permission IDs
      const menu = menuPermissions(menu_permissions, permissions)
      if (getUserRoleKey() === USER_ROLE_KEY)
        menu.splice(0, 0, { menu_detail_name: "My Product" })
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
