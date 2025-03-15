import React, { useState } from 'react';

const accordianId = Date.now() + '-' + Math.floor(Math.random() * 1000);
const AccordianHeader = ({ showIcon = true, title, collapsed, handleToggle, extra,
    prefix }) => {

    return (
        <h2 className="accordion-header" id={`heading${accordianId}`}>
            <div
                className={`accordion-button ${collapsed ? "" : "collapsed"}`}
                type="button"
                onClick={handleToggle}
                aria-expanded={collapsed}
                aria-controls={`collapse${accordianId}`}
            >
                <div className="userManagmentShortView">
                    <div className="manageOrg">
                        {prefix}
                        {showIcon &&  <div className="arrowDown me-2"><i className="fa-solid fa-caret-down"></i></div>}
                        <div className="title">{title}</div>
                    </div>
                </div>
            </div>
            {extra}
        </h2>

    )
}
const Accordian = ({ children, title, prefix, extra,showIcon }) => {

    const [collapsed, setCollapsed] = useState(false);

    const handleToggle = () => {
        setCollapsed(prev => !prev);
    }
    return (
        <div className="userManagmentRepeater">
            <div className="accordion-item">

                <AccordianHeader title={title} collapsed={collapsed} handleToggle={handleToggle}
                    prefix={prefix} extra={extra} showIcon={showIcon}/>

                {/* User Table */}
                <div
                    id={`collapse${accordianId}`}
                    className={`accordion-collapse collapse ${collapsed ? "show" : ""}`}
                    aria-labelledby={`heading${accordianId}`}
                    data-bs-parent="#userManageList"
                >
                    <div className="accordion-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Accordian;