import React, { useEffect, useState } from 'react';
import { FormItem } from './FormItem';

// Form Component
const Form = ({ children, onSubmit }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (Object.keys(formData).length > 0)
            validateForm();
    }, [formData]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Validate all fields based on the rules
    const validateForm = () => {
        const newErrors = {};

        React.Children.forEach(children, (child) => {
            if (child.props.type === "FormItem")
                validateInput(newErrors, child);
            else {
                React.Children.forEach(child.props.children, (cItem) => {
                    if (cItem.type.name === "FormItem")
                        validateInput(newErrors, cItem);
                });
            }

        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateInput = (newErrors, child) => {
        if (child.props.name) {
            // Collect the validation rules and run them
            const rules = child.props.rules || [];

            rules.forEach((rule) => {
                const value = formData[child.props.name] || '';

                if (rule.required && !value) {
                    newErrors[child.props.name] = rule.message || `${child.props.name} is required`;
                } else if (rule.pattern && !rule.pattern.test(value)) {
                    newErrors[child.props.name] = rule.message || `${child.props.name} is invalid`;
                } else if (rule.minLength && value.length < rule.minLength) {
                    newErrors[child.props.name] = rule.message || `${child.props.name} must be at least ${rule.minLength} characters long`;
                }
            });
        }
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData); // Pass formData to the parent onSubmit handler
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {React.Children.map(children, (child) => {
                // If the child is a FormItem, clone it and pass necessary props
                if (child.type === FormItem) {
                    return React.cloneElement(child, {
                        value: formData[child.props.name] || '',  // Handle form data
                        onChange: handleChange,                   // Wire up the onChange handler
                        error: errors[child.props.name],          // Pass error for that field
                    });
                }

                // If the child has nested elements, process them
                if (child.props && child.props.children) {
                    const nestedChildren = React.Children.map(child.props.children, (nestedChild) => {
                        if (nestedChild.type === FormItem) {
                            return React.cloneElement(nestedChild, {
                                value: formData[nestedChild.props.name] || '',
                                onChange: handleChange,
                                error: errors[nestedChild.props.name],
                            });
                        }
                        return nestedChild;  // Return non-FormItem elements unchanged
                    });

                    // Clone the parent child (e.g., a div) and pass the processed nested children
                    return React.cloneElement(child, { children: nestedChildren });
                }

                // Return the child as is if it's not a FormItem or doesn't need processing
                return child;
            })}
        </form>

    );
};

export default Form;
