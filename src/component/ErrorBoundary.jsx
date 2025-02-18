import React, { Component } from 'react';
import ServerError from './ServerError';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state to indicate an error has occurred
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Log error information if needed
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <ServerError />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
