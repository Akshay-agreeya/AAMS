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
            setFormData((prev) => ({ ...prev, [keyName]: value }));
        },
        getFieldValue(keyName) {
            return formData?.[keyName] || '';
        },
        setFieldsError(errs = {}) {

            // Set the errors in state (assumed to be some form state handler)
            setErrors(errs);

            // Early return if there are no errors
            const keys = Object.keys(errs);
            if (keys.length === 0) return;


            // Get the first field to focus
            const fieldElement = document.querySelector(`[name="${keys[0]}"]`);

            if (fieldElement) {
                // Scroll the field into view and focus it
                fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                fieldElement.focus();
            }
        }
    }));

    // Validate individual input field
    const validateInput = useCallback(async (newErrors, child, newFormData = formData) => {
        if (!child.props.name) return true;
    
        const rules = child.props.rules || [];
        const value = newFormData[child.props.name] || '';
    
        for (const rule of rules) {
            if (rule.required && !value) {
                newErrors[child.props.name] = rule.message || `${child.props.name} is required`;
                return false;
            }
    
            if (rule.type === "email" && value && !emailPattern.test(value)) {
                newErrors[child.props.name] = rule.message || `${child.props.name} is invalid email`;
                return false;
            }
    
            if (rule.pattern && !rule.pattern.test(value)) {
                newErrors[child.props.name] = rule.message || `${child.props.name} is invalid`;
                return false;
            }
    
            if (rule.minLength && value.length < rule.minLength) {
                newErrors[child.props.name] = rule.message || `${child.props.name} must be at least ${rule.minLength} characters long`;
                return false;
            }
    
            // Optional: support async custom rule
            if (rule.asyncValidator) {
                const isValid = await rule.asyncValidator(value);
                if (!isValid) {
                    newErrors[child.props.name] = rule.message || `${child.props.name} is invalid`;
                    return false;
                }
            }
        }
    
        // Cross-field match
        if (child.props.name === 'password' && newFormData['confirmPassword'] && newFormData['password'] !== newFormData['confirmPassword']) {
            newErrors['confirmPassword'] = 'Password and Confirm Password must match';
            return false;
        }
    
        if (child.props.name === 'confirmPassword' && newFormData['password'] && newFormData['password'] !== newFormData['confirmPassword']) {
            newErrors['confirmPassword'] = 'Password and Confirm Password must match';
            return false;
        }
    
        return true;
    }, [formData]);
    

    // Memoize validateForm function to avoid unnecessary re-creations
    const validateForm = useCallback(async () => {
        const newErrors = {};
        let firstErrorField = null;
    
        // Collect async validation promises
        const validationPromises = [];
    
        const validateChildrenRecursively = (children) => {
            React.Children.forEach(children, (child) => {
                if (child?.type === FormItem) {
                    const promise = validateInput(newErrors, child).then((isValid) => {
                        if (!isValid && !firstErrorField) {
                            firstErrorField = child;
                        }
                    });
                    validationPromises.push(promise);
                } else if (child?.props?.children) {
                    validateChildrenRecursively(child.props.children);
                }
            });
        };
    
        validateChildrenRecursively(children);
    
        // Wait for all async validations to complete
        await Promise.all(validationPromises);
    
        setErrors(newErrors);
    
        if (firstErrorField) {
            const fieldElement = document.querySelector(`[name="${firstErrorField.props.name}"]`);
            if (fieldElement) {
                fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                fieldElement.focus();
            }
        }
    
        return Object.keys(newErrors).length === 0;
    }, [children, validateInput]);
    

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
        const newValue = multiple && selectedOptions.length > 0 ? Array.from(selectedOptions).map(option => option.value) : value

        setFormData((prev) => ({ ...prev, [name]: newValue }));

        // Find the child (or nested child) by its name
        const foundChild = findChildByName(children, name);
        if (foundChild) {
            const newErrors = { ...errors, [foundChild.props.name]: '' };
            validateInput(newErrors, foundChild, { ...formData, [name]: newValue }); // Validate only the found child
            setErrors(newErrors);
        }
    };

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        const status = await validateForm();
        if (status) {
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
