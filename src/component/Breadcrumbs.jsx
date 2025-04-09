import React from 'react';
import { useLocation } from 'react-router-dom';
import { routesMap } from '../App';
import { getUserRoleKey, gotoPath } from '../utils/Helper';


// Utility to detect edit actions (e.g., "edituser", "editrole")
const isEditAction = (path) => {
  return /edit/.test(path);
};

const isViewAction = (path) => {
  return /view/.test(path);
};

// Generates breadcrumbs dynamically based on the current URL path
export const generateBreadcrumbs = (addHome = true, pathnames) => {
  // Initialize breadcrumbs array
  const breadcrumbs = [];

  // Add "Home" breadcrumb if required
  if (addHome) {
    breadcrumbs.push({ url: gotoPath(getUserRoleKey()), label: "Home" });
  }

  let currentPath = "";

  // Iterate over the path segments to generate breadcrumbs
  pathnames.forEach((value, index) => {
    currentPath += `/${value}`;

    // Find the matching route from the routesMap
    const route = routesMap.find(r => {
      // Handle dynamic routes like 
      const pathRegExp = new RegExp(`^${r.path.replace(/(:\w+)/g, '([^/]+)')}$`);
      return pathRegExp.test(currentPath);
    });
    const isLast = index === pathnames.length - 1;  // Check if it's the last breadcrumb

    if (route) {
      let label = route.breadcrumb || value;  // Use route breadcrumb or fallback to the path segment

      // Check if it's an edit action (like edituser, editrole, etc.)
      if (isEditAction(route.path)||isViewAction(route.path)) {
        // Set the dynamic entity ID from the next path segment (like user_id, role_id)
        // entityId = pathnames[index];
        label = `${label} `;  // e.g., Edit User #123
      }

      // Push the breadcrumb item (either with a URL or just the label for the last one)
      if (isLast) {
        breadcrumbs.push({ label: label });
      } else {
        breadcrumbs.push({ url: currentPath, label: label });
      }
    }
  });

  return breadcrumbs;
};

const Breadcrumbs = ({ breadcrumbs, addHome }) => {

  const location = useLocation();  // Get current location (URL)
  const pathnames = location.pathname.split('/').filter(Boolean); // Split the pathname
  const breadcrumbArr = breadcrumbs ?? generateBreadcrumbs(addHome, pathnames);

  return (
    <div className="breadcrumbsContainer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {breadcrumbArr.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item.url ? (
                    <a href={item.url}>{item.label}</a> // Assuming `item.url` is the link, and `item.label` is the text
                  ) : (
                    <>{item.label}</>// If there's no URL, just show the label
                  )}
                  {index < breadcrumbArr.length - 1 && ' > '} {/* Separator if it's not the last item */}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumbs;