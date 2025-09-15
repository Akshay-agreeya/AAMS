// component/NotificationBell.js
import React, { useState, useEffect } from 'react';
import { getData } from '../../utils/CommonApi';
import { Link } from 'react-router-dom';

const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
    // Set up interval to check for new notifications every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await getData('/notifications/unread-count');
      setUnreadCount(response.unread_count || 0);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  return (
    <Link to="/notifications" className="notification-bell-link position-relative">
      <i className="fas fa-bell fa-lg"></i>
      {unreadCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {unreadCount > 99 ? '99+' : unreadCount}
          <span className="visually-hidden">unread notifications</span>
        </span>
      )}
    </Link>
  );
};

export default NotificationBell;