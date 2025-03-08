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
                    name,
                    value,
                    onChange,
                })
                : children}
            {error && <div className="mt-2" style={{ color: 'red' }}>{error}</div>}
        </>
    );
};
