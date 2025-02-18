import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/App.css';
import { AuthProvider } from './common/auth/AuthContext';
import Login from './common/auth/Login';
import PrivateRoute from './route/PrivateRoute';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement/UserManagement';
import NotFound from './component/NotFound';
import ErrorBoundary from './component/ErrorBoundary';

function App() {
    return (<AuthProvider>
        <Router>
            <ErrorBoundary> {/* Wrap your app in ErrorBoundary */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/admin/dashboard"
                        element={<PrivateRoute element={Dashboard} />}
                    />
                    <Route
                        path="/admin/user-management"
                        element={<PrivateRoute element={UserManagement} />}
                    />
                    {/* Add a fallback 404 route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    </AuthProvider>
    )
}

export default App;
