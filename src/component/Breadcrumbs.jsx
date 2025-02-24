import React from 'react';
import { useLocation } from 'react-router-dom';
import { routesMap } from '../App';


// export const generateBreadcrumbs = (addHome, pathnames) => {



//   const breadcrumbs = addHome ? [

//     // Home is always the starting point
//     { url: "/admin/dashboard", label: "Home" }
//   ] : [];

//   let currentPath = '';

//   // Iterate over the path segments and create breadcrumb items
//   pathnames.forEach((segment,index) => {
//     currentPath += `/${segment}`;
//     const isLast = index === pathnames.length - 1;
//     // Get the label from breadcrumbMap or fallback to the segment itself
//     const path = `/${pathnames.slice(0, index + 1).join('/')}`;
//       const route = routesMap.find(r => r.path === path);
//     const breadcrumb = isLast ? { label: label } : { url: currentPath, label: label };
//     breadcrumbs.push(
//       breadcrumb
//     );
//   });

//   return breadcrumbs;
// };

export const generateBreadcrumbs = (addHome = true, pathnames) => {


  // Home is always the starting point
  const breadcrumbs = [];

  pathnames.forEach((value, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    const route = routesMap.find(r => r.path === path);
    const isLast = index === pathnames.length - 1;
    if (value !== "admin") {
      if (isLast !== true) {
        breadcrumbs.push({ url: path, label: route.breadcrumb });
      }
      else
        breadcrumbs.push({ label:  route.breadcrumb });
    }
    else if (addHome)
      breadcrumbs.push({ url: "/admin/dashboard", label: "Home" });
  });
  return breadcrumbs;
  // Iterate over the path segments and create breadcrumb items
  // pathnames.forEach((_segment, index) => {

  //   // Get the label from breadcrumbMap or fallback to the segment itself
  //   const path = `/${pathnames.slice(0, index + 1).join('/')}`;
  //   const route = routesMap.find(r => r.path === path);
  //   if (route) {

  //     breadcrumbs.push(
  //       { url: path, label: route }
  //     );
  //   }
  //   return 
  // });

  // return breadcrumbs;
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