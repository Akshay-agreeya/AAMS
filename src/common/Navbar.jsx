import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserRole } from '../utils/Helper';
import { getData } from '../utils/CommonApi';

const Navbar = () => {

  const [menuDetails, setMenuDetails] = useState([]);
  const permissions = getUserRole();

  useEffect(() => {
    getMenuDetails();
  }, []);

  const urlMapping = {
    dashboard: '/admin/dashboard',
    user_management: '/admin/user-management',
    role_management: '/admin/role-management',
    product_permission: '/admin/product-permission',
    product_management: '/admin/product-management',
    reports: '/admin/reports',
  }

  const getMenuDetails = async () => {
    try {
      const resp = await getData("/lookup/permissions");

      // Extract just the permission IDs
      const permissionIds = permissions.map(item => item.menu_detail_permission_id);

      const data = resp.contents?.map(menuDetail => {
        const filteredOperations = menuDetail.operations.filter(operation =>
          permissionIds.includes(operation.menu_detail_permission_id)
        );

        // Return menuDetail only if there are operations left
        if (filteredOperations.length > 0) {
          return {
            ...menuDetail,
            operations: filteredOperations
          };
        }
        return null; // Return null if no operations left
      })
        .filter(menuDetail => menuDetail !== null);
      setMenuDetails(data);
      localStorage.setItem("user_menu",JSON.stringify(data));
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className={`nav-item ms-0`}>
        <NavLink
          className="nav-link"
          to={`/admin/dashboard`}
          end // Ensure exact match for this route
        >
          Dashboard
        </NavLink>
      </li>
      {menuDetails.map((item, index) => <li className={`nav-item`} key={index}>
        <NavLink
          className="nav-link"
          to={urlMapping[item.menu_detail_name?.replace(/ /g, '_').toLowerCase()]}
          end // Ensure exact match for this route
        >
          {item.menu_detail_name}
        </NavLink>
      </li>)}
    </ul>
  );
};

export default Navbar;
