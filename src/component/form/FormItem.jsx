import React from 'react';

// FormItem Component
export const FormItem = ({ name, label, value, onChange, error, children }) => {
    return (
        <>
           { label&&<label>{label}</label>}
            {React.isValidElement(children)
                ? React.cloneElement(children, {
                      name: name,
                      value: value,
                      onChange: onChange,
                  })
                : children}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </>
    );
};
