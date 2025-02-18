import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/App.css';
import { AuthProvider } from './common/auth/AuthContext';
import Login from './common/auth/Login';
import PrivateRoute from './route/PrivateRoute';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement/UserManagement';
<<<<<<< HEAD
import NotFound from './component/NotFound';
import ErrorBoundary from './component/ErrorBoundary';
=======
import AddUser from './pages/UserManagement/AddUser';
import EditUser from './pages/UserManagement/EditUser';
import ViewUser from './pages/UserManagement/ViewUser';
import RoleManagement from './pages/RoleManagement/RoleManagement'
import ForgotPassword from './pages/ForgotPassword';
import AddRole from './pages/RoleManagement/AddRole';
import EditRole from './pages/RoleManagement/EditRole';
import AddOrg from '../src/pages/Organization/AddOrg';
import EditOrg from '../src/pages/Organization/EditOrg';
import ProductPermission from './pages/ProductPermission';
import ProductManagement from './pages/ProductManagement/ProductManagement';

>>>>>>> abhishek

function App() {
    return (<AuthProvider>
        <Router>
<<<<<<< HEAD
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
=======
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
                <Route
                    path="/admin/role-management"
                    element={<PrivateRoute element={RoleManagement} />}
                />
                <Route
                    path="/forgot-password"
                    element={<PrivateRoute element={ForgotPassword} />}
                />
                <Route
                    path="/admin/addrole"
                    element={<PrivateRoute element={AddRole} />}
                />
                <Route
                    path="/admin/editrole"
                    element={<PrivateRoute element={EditRole} />}
                />
                <Route
                    path="/admin/adduser"
                    element={<PrivateRoute element={AddUser} />}
                />
                <Route
                    path="/admin/edituser"
                    element={<PrivateRoute element={EditUser} />}
                />
                <Route
                    path="/admin/viewuser"
                    element={<PrivateRoute element={ViewUser} />}
                />
                <Route
                    path="/admin/addorg"
                    element={<PrivateRoute element={AddOrg} />}
                />
                <Route
                    path="/admin/editorg"
                    element={<PrivateRoute element={EditOrg} />}
                />
                <Route
                    path="/admin/product-permission"
                    element={<PrivateRoute element={ProductPermission} />}
                />
                <Route
                    path="/admin/product-management"
                    element={<PrivateRoute element={ProductManagement} />}
                />
            </Routes>
>>>>>>> abhishek
        </Router>
    </AuthProvider>
    )
}

export default App;
