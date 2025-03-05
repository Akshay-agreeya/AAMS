import React from 'react';

// FormItem Component
export const FormItem = ({ name, label, value, onChange, error, children, requiredMark = false }) => {
    return (
        <>
            {label && <label className='form-label'>
                {label} {requiredMark && <span className="required">*</span>}
            </label>
            }
            {React.isValidElement(children)
                ? React.cloneElement(children, {
                    name: name,
                    value: value,
                    onChange: onChange,
                })
                : children}
            {error&& <div style={{ color: 'red' }}>{error}</div>}
        </>
    );
};
