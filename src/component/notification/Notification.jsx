import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';  // Ensure you are importing from 'react-dom/client'
import './Notification.css';

// Global notification state
let notificationId = 0;
const notificationsQueue = [];

// Create a single root only once
let notificationRoot = null;

const initializeNotificationRoot = () => {
    const rootElement = document.getElementById('notification-root') || document.body;

    // Initialize the root only once
    if (!notificationRoot) {
        notificationRoot = ReactDOM.createRoot(rootElement);  // Using createRoot for React 18+
    }
};

// Add a new notification to the queue
const addNotification = (options) => {
    const {title="AAMS", message, type = 'info', duration = 5000 } = options;
    const id = notificationId++;

    // Push the notification into the queue
    notificationsQueue.push({ id, title, message, type, duration, timestamp: Date.now() });

    // Re-render notifications after adding one
    renderNotifications();
};

// Remove a notification (either after duration or click)
const removeNotification = (id) => {
    const index = notificationsQueue.findIndex((n) => n.id === id);
    if (index !== -1) {
        notificationsQueue.splice(index, 1);
    }
    renderNotifications();
};

// Notification component for each individual notification
const Notification = ({ id, title, message, type, duration, onClose }) => {
    useEffect(() => {
        // Auto-remove notification after the specified duration
        const timer = setTimeout(() => {
            onClose(id);
        }, duration);

        return () => clearTimeout(timer); // Clean up the timer
    }, [duration, id, onClose]);

    const handleClick = () => {
        onClose(id); // Remove the notification when clicked
    };

    const renderIcon = () => {
        switch (type) {
            case 'success':
                return <span className="info-icon">ℹ️</span>;
            case 'error':
                return <span className="info-icon">ℹ️</span>;
            case 'info':
                return <span className="info-icon">ℹ️</span>;
            case 'warning':
                return <span className="info-icon">ℹ️</span>;
            default:
                return null;
        }
    }

    return (
        
        <div className={`notification notification-${type}`}>
            <div className="notification-icon">
                {renderIcon()}
            </div>
            <div className="notification-content">
                <h6 className="notification-title">{title}</h6>
                <p className="notification-message">{message}</p>
            </div>
            <div className="notification-close">
                <span className="close-icon" onClick={handleClick}>&times;</span>
            </div>
        </div>
    );
};

// Notification container to display all active notifications
const NotificationContainer = () => {
    return (
        <div className="notification-container">
            {notificationsQueue.map((notification) => (
                <Notification
                    key={notification.id}
                    id={notification.id}
                    title={notification.title}
                    message={notification.message}
                    type={notification.type}
                    duration={notification.duration}
                    onClose={removeNotification}
                />
            ))}
        </div>
    );
};

// Render the notifications container using ReactDOM.createRoot
const renderNotifications = () => {
    initializeNotificationRoot();

    // Render notifications in the React 18 root element
    notificationRoot.render(<NotificationContainer />);
};

// Notification API (Global Methods)
const notification = {
    success: (options) => addNotification({ ...options, type: 'success' }),
    error: (options) => addNotification({ ...options, type: 'error' }),
    info: (options) => addNotification({ ...options, type: 'info' }),
    warning: (options) => addNotification({ ...options, type: 'warning' }),
};

export default notification;
