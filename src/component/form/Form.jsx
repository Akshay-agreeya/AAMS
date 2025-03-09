import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { FormItem } from './FormItem';
import { emailPattern } from '../../constants';

// Form Component
const Form = forwardRef((props, ref) => {

    const { children, onSubmit, initialValues = {} } = props;

    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    // Forward ref

    useImperativeHandle(ref, () => ({
        setFieldsValue(values) {
            setFormData(values);
        },
        setFieldValue(keyName, value) {
            setFormData({...formData,[keyName]:value});
        }
    }));

    // Validate individual input field
    const validateInput = useCallback((newErrors, child, newFormData = formData) => {
        if (child.props.name) {
            const rules = child.props.rules || [];

            rules.forEach((rule) => {
                const value = newFormData[child.props.name] || '';

                if (rule.required && !value) {
                    newErrors[child.props.name] = rule.message || `${child.props.name} is required`;
                } else if (rule.type === "email" && value && !emailPattern.test(value)) {
                    newErrors[child.props.name] = rule.message || `${child.props.name} is required`;
                }
                else if (rule.pattern && !rule.pattern.test(value)) {
                    newErrors[child.props.name] = rule.message || `${child.props.name} is invalid`;
                } else if (rule.minLength && value.length < rule.minLength) {
                    newErrors[child.props.name] = rule.message || `${child.props.name} must be at least ${rule.minLength} characters long`;
                }

                if (child.props.name === 'password' && newFormData['confirmPassword'] && newFormData['password'] !== newFormData['confirmPassword']) {
                    newErrors['confirmPassword'] = 'Password and Confirm Password must match';
                }

                if (child.props.name === 'confirmPassword' && newFormData['password'] && newFormData['password'] !== newFormData['confirmPassword']) {
                    newErrors['confirmPassword'] = 'Password and Confirm Password must match';
                }
            });
        }
    }, [formData]);

    // Memoize validateForm function to avoid unnecessary re-creations
    const validateForm = useCallback(() => {
        const newErrors = {};

        const validateChildrenRecursively = (children) => {
            React.Children.forEach(children, (child) => {
                if (child?.type?.name === "FormItem") {
                    validateInput(newErrors, child);
                } else if (child?.props?.children) {
                    validateChildrenRecursively(child.props.children); // Recurse if there are nested children
                }
            });
        };

        validateChildrenRecursively(children);
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }, [children, validateInput]); // Include dependencies

    // Handle input change
    const findChildByName = (children, name) => {
        let foundChild = null;

        // Use a normal for loop to allow breaking
        for (let i = 0; i < React.Children.count(children); i++) {
            const child = React.Children.toArray(children)[i];

            // Check if the current child has the matching name
            if (child?.props?.name === name) {
                foundChild = child; // Found the matching child
                break; // Exit the loop after finding the first matching child
            }

            // If the child has nested children, recursively search them
            if (child?.props?.children) {
                foundChild = findChildByName(child.props.children, name);
            }

            if (foundChild) break; // If found in nested children, stop searching
        }

        return foundChild; // Return the found child or null if not found
    };


    // Example usage in the context of your form
    const handleChange = (e) => {
        const { name, selectedOptions, multiple, value } = e.target;
        const newValue = multiple?Array.from(selectedOptions).map(option => option.value):value
        const newFormData = { ...formData, [name]: newValue };
        setFormData(newFormData);

        // Find the child (or nested child) by its name
        const foundChild = findChildByName(children, name);
        if (foundChild) {
            const newErrors = { ...errors, [foundChild.props.name]: '' };
            validateInput(newErrors, foundChild, newFormData); // Validate only the found child
            setErrors(newErrors);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData); // Pass formData to the parent onSubmit handler
        }
    };

    const processChildren = (child) => {
        if (child?.type === FormItem) {
            return React.cloneElement(child, {
                value: formData[child.props.name] || '',
                onChange: (e) => {

                    // Call the child's original children onChange handler (if it exists)
                    if (child?.props?.children?.props?.onChange)
                        child.props.children?.props?.onChange(e);

                    // Call the child's original onChange handler (if it exists)
                    if (child?.props?.onChange)
                        child.props.onChange(e);

                    // Optionally, you can also still handle form-specific logic here
                    handleChange(e); // or other logic
                },
                error: errors[child.props.name],
            });
        }

        if (child?.props && child.props?.children) {
            const nestedChildren = React.Children.map(child.props.children, processChildren);
            return React.cloneElement(child, { children: nestedChildren });
        }

        return child;
    };

    return (
        <form onSubmit={handleSubmit}>
            {React.Children.map(children, processChildren)}
        </form>
    );
});

export default Form;
