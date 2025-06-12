import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const UrlAutocomplete = forwardRef(({ pageUrls, onChange = () => { }, selectedUrl = '',
    onInputChange = () => { } }, ref) => {


    const [inputValue, setInputValue] = useState(selectedUrl);
    const [selectedPageUrl, setSelectedPageUrl] = useState(selectedUrl);
    const [filteredUrls, setFilteredUrls] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [readOnly, setReadOnly] = useState(true);

    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useImperativeHandle(ref, () => ({
        setUrlValue(value) {
            setInputValue(value);
            setSelectedPageUrl(value);
        },
        setReadOnlyInput(status) {
            setReadOnly(status);
        }
    }))

    // Styles
    const styles = {
        container: {
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '16px',
            fontFamily: 'Arial, sans-serif'
        },
        demoContent: {
            marginBottom: '24px',
            padding: '16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px'
        },
        demoTitle: {
            fontWeight: '600',
            color: '#333',
            marginBottom: '8px',
            margin: '0 0 8px 0'
        },
        demoText: {
            color: '#666',
            margin: '0'
        },
        label: {
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '8px'
        },
        inputContainer: {
            position: 'relative'
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '16px',
            outline: 'none',
            transition: 'all 0.2s ease',
            boxSizing: 'border-box'
        },
        inputFocus: {
            borderColor: '#3b82f6',
            boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)'
        },
        dropdown: {
            position: 'absolute',
            zIndex: '1000',
            width: '100%',
            marginTop: '4px',
            backgroundColor: 'white',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            maxHeight: '256px',
            overflowY: 'auto',
            backdropFilter: 'blur(4px)'
        },
        option: {
            padding: '12px 16px',
            cursor: 'pointer',
            transition: 'background-color 0.15s ease',
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            color: '#374151'
        },
        optionLast: {
            borderBottom: 'none'
        },
        optionHover: {
            backgroundColor: '#eff6ff'
        },
        optionHighlighted: {
            backgroundColor: '#dbeafe',
            color: '#1e40af'
        },
        optionAdd: {
            color: '#059669'
        },
        optionAddHighlighted: {
            backgroundColor: '#d1fae5'
        },
        icon: {
            width: '16px',
            height: '16px',
            marginRight: '12px',
            color: '#9ca3af'
        },
        iconAdd: {
            color: '#10b981'
        },
        noResults: {
            padding: '12px 16px',
            color: '#6b7280',
            textAlign: 'center'
        },
        selectedUrl: {
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '6px'
        },
        selectedUrlText: {
            fontSize: '14px',
            color: '#166534',
            margin: '0'
        },
        additionalContent: {
            marginTop: '24px'
        },
        noticeBox: {
            padding: '16px',
            backgroundColor: '#fefce8',
            border: '1px solid #fde047',
            borderRadius: '8px',
            marginBottom: '16px'
        },
        noticeTitle: {
            fontWeight: '500',
            color: '#a16207',
            marginBottom: '8px',
            margin: '0 0 8px 0'
        },
        noticeText: {
            color: '#a16207',
            margin: '0'
        },
        formBox: {
            padding: '16px',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '8px'
        },
        formTitle: {
            fontWeight: '500',
            color: '#1e40af',
            marginBottom: '8px',
            margin: '0 0 8px 0'
        },
        formInput: {
            width: '100%',
            padding: '8px 12px',
            border: '1px solid #bfdbfe',
            borderRadius: '6px',
            fontSize: '14px',
            boxSizing: 'border-box'
        }
    };

    useEffect(() => {
        onChange({ target: { value: selectedPageUrl } });
        // setReadOnly(true);
    }, [selectedPageUrl])
    // Filter URLs based on input
    useEffect(() => {
        setFilteredUrls(pageUrls);
        setHighlightedIndex(-1);
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setShowDropdown(true);
        onInputChange(e);
    };

    // Handle option selection
    const handleOptionSelect = (url) => {
        setInputValue(url);
        setSelectedPageUrl(url);
        setShowDropdown(false);
        setHighlightedIndex(-1);
        setReadOnly(true);
        // Your onChange logic here
        console.log('Selected URL:', url);
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
        if (!showDropdown) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev =>
                    prev < filteredUrls.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleOptionSelect(filteredUrls[highlightedIndex]);
                } else if (inputValue.trim()) {
                    handleOptionSelect(inputValue.trim());
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                setHighlightedIndex(-1);
                break;
        }
    };

    // Handle input focus
    const handleInputFocus = () => {
        setShowDropdown(true);
    };

    // Handle clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
                setHighlightedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Link icon SVG
    const LinkIcon = () => (
        <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
    );

    // Plus icon SVG
    const PlusIcon = () => (
        <svg style={{ ...styles.icon, ...styles.iconAdd }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    );

    // Search icon SVG
    const SearchIcon = () => (
        <svg style={{ ...styles.icon, width: '20px', height: '20px', margin: '0 auto 4px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );

    return (
        <div style={styles.container}>
            {/* Demo content to show overlay effect */}

            <div style={styles.inputContainer}>
                <input
                    ref={inputRef}
                    id="url-input"
                    type="text"
                    className='form-control'
                    placeholder="Type to enter new URL..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    aria-label="URL Autocomplete"
                    aria-expanded={showDropdown}
                    aria-haspopup="listbox"
                    role="combobox"
                    autoComplete='off'
                    readOnly={readOnly}
                />

                {showDropdown && (
                    <div
                        ref={dropdownRef}
                        style={styles.dropdown}
                        role="listbox"
                    >
                        {filteredUrls.length > 0 ? (
                            filteredUrls.map((url, index) => (
                                <div
                                    key={url}
                                    style={{
                                        ...styles.option,
                                        ...(index === filteredUrls.length - 1 ? styles.optionLast : {}),
                                        ...(index === highlightedIndex ? styles.optionHighlighted : {})
                                    }}
                                    onClick={() => handleOptionSelect(url)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    role="option"
                                    aria-selected={index === highlightedIndex}
                                >
                                    <LinkIcon />
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{url}</span>
                                </div>
                            ))
                        ) : inputValue.trim() ? (
                            <div
                                style={{
                                    ...styles.option,
                                    ...styles.optionAdd,
                                    ...(highlightedIndex === 0 ? styles.optionAddHighlighted : {})
                                }}
                                onClick={() => handleOptionSelect(inputValue.trim())}
                                onMouseEnter={() => setHighlightedIndex(0)}
                                role="option"
                            >
                                <PlusIcon />
                                <span>Add "<strong>{inputValue.trim()}</strong>"</span>
                            </div>
                        ) : (
                            <div style={styles.noResults}>
                                <SearchIcon />
                                No URLs found
                            </div>
                        )}
                    </div>
                )}
            </div>



        </div>
    );
});

export default UrlAutocomplete;