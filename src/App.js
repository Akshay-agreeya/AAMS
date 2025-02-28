import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './common/auth/AuthContext';
import Login from './common/auth/Login';
import PrivateRoute from './route/PrivateRoute';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement/UserManagement';
import NotFound from './component/NotFound';
import ErrorBoundary from './component/ErrorBoundary';
import AddUser from './pages/UserManagement/AddUser';
import EditUser from './pages/UserManagement/EditUser';
import ViewUser from './pages/UserManagement/ViewUser';
import RoleManagement from './pages/RoleManagement/RoleManagement'
import ForgotPassword from './pages/ForgotPassword';
import AddRole from './pages/RoleManagement/AddRole';
import EditOrganization from '../src/pages/Organization/EditOrg';
import ProductPermission from './pages/ProductPermission';
import ProductManagement from './pages/ProductManagement/ProductManagement';
import ChangePassword from './common/auth/ChangePassword';
import Reports from './pages/Report/Reports';
import ReportListing from './pages/Report/ReportListing';
import ViewService from './pages/ProductManagement/ViewService';
import AddService from './pages/ProductManagement/AddService';
import AddOrganization from '../src/pages/Organization/AddOrg';

export const routesMap = [
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/forgotpassword", element: <ForgotPassword /> },
    { path: "/changepassword", element: <ChangePassword /> },
    { path: "/reportlisting", element: <ReportListing /> },
    { path: "/admin/dashboard", element: <PrivateRoute element={Dashboard} />, breadcrumb: "Dashboard" },
    { path: "/admin/user-management", element: <PrivateRoute element={UserManagement} />, breadcrumb: "User Management" },
    { path: "/admin/user-management/addorg", element: <PrivateRoute element={AddOrganization} />, breadcrumb: "Add Organization" },
    { path: "/admin/user-management/editorganization/:org_id", element: <PrivateRoute element={AddOrganization} />, breadcrumb: "Edit Organization" },
    { path: "/admin/user-management/adduser/:org_id", element: <PrivateRoute element={AddUser} />, breadcrumb: "Add User" },
    { path: "/admin/user-management/edituser/:user_id", element: <PrivateRoute element={AddUser} />, breadcrumb: "Edit User" },
    { path: "/admin/user-management/viewuser/:user_id", element: <PrivateRoute element={ViewUser} />, breadcrumb: "View User" },
    { path: "/admin/role-management", element: <PrivateRoute element={RoleManagement} />, breadcrumb: "Role Management" },
    { path: "/admin/role-management/addrole", element: <PrivateRoute element={AddRole} />, breadcrumb: "Add Role " },
    { path: "/admin/role-management/editrole", element: <PrivateRoute element={AddRole} />, breadcrumb: "Edit Role " },
    { path: "/admin/product-permission", element: <PrivateRoute element={ProductPermission} />, breadcrumb: "ProductPermission" },
    { path: "/admin/product-management", element: <PrivateRoute element={ProductManagement} />, breadcrumb: "Product Management" },
    { path: "/admin/product-management/addservice", element: <PrivateRoute element={AddService} />, breadcrumb: "Add Product" },
    { path: "/admin/product-management/editservice", element: <PrivateRoute element={AddService} />, breadcrumb: "Edit Product" },
    { path: "/admin/product-management/viewservice", element: <PrivateRoute element={ViewService} />, breadcrumb: "View Product" },
    { path: "/admin/reports", element: <PrivateRoute element={Reports} />, breadcrumb: "Report" },
]

function App() {
    return (<AuthProvider>
        <Router>
            <ErrorBoundary>
                <Routes>
                    {routesMap.map((item, index) => <Route path={item.path} element={item.element} key={index} />

                    )}
                    {/* <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/changepassword" element={<ChangePassword />} />
                    <Route path="/reportlisting" element={<ReportListing />} />
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
                        path="/admin/user-management/adduser"
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
                        path="/admin/user-management/addorg"
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
                    <Route
                        path="/admin/reports"
                        element={<PrivateRoute element={Reports} />}
                    />
                     <Route
                        path="/admin/reportlisting"
                        element={<PrivateRoute element={ReportListing} />}
                    /> 
                    <Route
                        path="/admin/editservice"
                        element={<PrivateRoute element={EditService} />}
                    />
                    <Route
                        path="/admin/addservice"
                        element={<PrivateRoute element={AddService} />}
                    />
                    <Route
                        path="/admin/viewservice"
                        element={<PrivateRoute element={ViewService} />}
                    /> */}

                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Routes>
            </ErrorBoundary>
        </Router>
    </AuthProvider>
    )
}

export default App;
