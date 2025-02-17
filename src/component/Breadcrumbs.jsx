import React from 'react'

const Breadcrumbs = ({ breadcrumbs = [{ url: "admin/dashboard", label: "Home" }] }) => {
  return (
    <div className="breadcrumbsContainer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {breadcrumbs.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item.url ? (
                    <a href={item.url}>{item.label}</a> // Assuming `item.url` is the link, and `item.label` is the text
                  ) : (
                    <>{item.label}</>// If there's no URL, just show the label
                  )}
                  {index < breadcrumbs.length - 1 && ' > '} {/* Separator if it's not the last item */}
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