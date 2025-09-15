// component/Notification.js
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { getData, patchData } from "../../utils/CommonApi";
import { formatDistanceToNow } from "date-fns";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    fetchNotifications();
  }, [currentPage]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getData(`/notifications?page=${currentPage}&size=${pageSize}`);
      setNotifications(response.contents || []);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await patchData(`/notifications/${notificationId}/read`);
      // Update local state
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="adaMainContainer">
          <section className="adminControlContainer">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="pageTitle">
                    <h1>Notifications</h1>
                  </div>
                  <div className="text-center py-4">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Notifications</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="userManagmentContainer">
                  {notifications.length === 0 ? (
                    <div className="text-center py-5">
                      <div className="mb-3">
                        <i className="fas fa-bell-slash fa-3x text-muted"></i>
                      </div>
                      <h5 className="text-muted">No notifications yet</h5>
                      <p className="text-muted">When you have notifications, they'll appear here.</p>
                    </div>
                  ) : (
                    <div className="notification-list">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`notification-item p-3 mb-3 border rounded ${
                            !notification.is_read ? 'border-primary bg-light' : 'border-secondary'
                          }`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => !notification.is_read && markAsRead(notification.id)}
                        >
                          <div className="d-flex align-items-start">
                            <div className="me-3">
                              <span className={`badge ${getNotificationColor(notification.type)} p-2`}>
                                {getNotificationIcon(notification.type)}
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <h6 className={`mb-1 ${!notification.is_read ? 'fw-bold' : ''}`}>
                                    {notification.title}
                                  </h6>
                                  <p className={`mb-1 ${!notification.is_read ? 'fw-semibold' : 'text-muted'}`}>
                                    {notification.message}
                                  </p>
                                  <small className="text-muted">
                                    {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                  </small>
                                </div>
                                {!notification.is_read && (
                                  <div className="ms-2">
                                    <span className="badge bg-primary rounded-pill">New</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <nav aria-label="Notifications pagination">
                          <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                              >
                                Previous
                              </button>
                            </li>
                            
                            {[...Array(totalPages)].map((_, index) => (
                              <li
                                key={index + 1}
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => setCurrentPage(index + 1)}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            ))}
                            
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                              >
                                Next
                              </button>
                            </li>
                          </ul>
                        </nav>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Notification;







// import React from "react";
// import Layout from "../Layout";

// const Notification = () => {
//   return (
//     <Layout>
//       <div className="adaMainContainer">
//     <section className="adminControlContainer">
//       <div className="container">
//         <div className="row">
          
//          <h1>hellos</h1>
          
//         </div>
//       </div>
//     </section>
//     </div>
//     </Layout>
//   );
// };

// export default Notification;

