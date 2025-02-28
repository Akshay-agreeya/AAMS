import React, { useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { FormItem } from './FormItem';

// Form Component
const Form = forwardRef((props,ref) => {

    const { children, onSubmit, initialValues = {} } = props;

    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    // Forward ref

    useImperativeHandle(ref, ()=>({
        setFieldsValue(values){
            setFormData(values);
        }
    }));

    // Validate individual input field
    const validateInput = useCallback((newErrors, child) => {
        if (child.props.name) {
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

                if (child.props.name === 'password' && formData['confirmPassword'] && formData['password'] !== formData['confirmPassword']) {
                    newErrors['confirmPassword'] = 'Password and Confirm Password must match';
                }

                if (child.props.name === 'confirmPassword' && formData['password'] && formData['password'] !== formData['confirmPassword']) {
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
                if (child.type?.name === "FormItem") {
                    validateInput(newErrors, child);
                } else if (child.props?.children) {
                    validateChildrenRecursively(child.props.children); // Recurse if there are nested children
                }
            });
        };

        validateChildrenRecursively(children);
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }, [children, validateInput]); // Include dependencies

    useEffect(() => {
        if (Object.keys(formData).length > 0) {
            validateForm(); // Call validateForm when formData changes
        }
    }, [formData, validateForm]); // Include validateForm in the dependency array

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(formData); // Pass formData to the parent onSubmit handler
        }
    };

    const processChildren = (child) => {
        if (child.type === FormItem) {
            return React.cloneElement(child, {
                value: formData[child.props.name] || '',
                onChange: handleChange,
                error: errors[child.props.name],
            });
        }

        if (child.props && child.props.children) {
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
