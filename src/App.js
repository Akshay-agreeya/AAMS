import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/App.css';
import { AuthProvider } from './common/auth/AuthContext';
import Login from './common/auth/Login';
import PrivateRoute from './route/PrivateRoute';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement/UserManagement';

function App() {
    return (<AuthProvider>
        <Router>
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
            </Routes>
        </Router>
    </AuthProvider>
    )
}

export default App;
