import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './common/auth/AuthContext';
import Login from './common/auth/Login';
import ResetPassword from './common/auth/ResetPassword';
import PrivateRoute from './route/PrivateRoute';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement/UserManagement';
import NotFound from './component/NotFound';
import ErrorBoundary from './component/ErrorBoundary';
import AddUser from './pages/UserManagement/AddUser';
import ViewUser from './pages/UserManagement/ViewUser';
import RoleManagement from './pages/RoleManagement/RoleManagement'
import ForgotPassword from './pages/ForgotPassword';
import AddRole from './pages/RoleManagement/AddRole';
import ProductPermission from './pages/ProductPermision/ProductPermission';
import ProductManagement from './pages/ProductManagement/ProductManagement';
import ChangePassword from './common/auth/ChangePassword';
import Reports from './pages/Report/Reports';
import ViewService from './pages/ProductManagement/ViewService';
import AddProduct from './pages/ProductManagement/AddProduct';
import ViewProduct from './pages/ProductManagement/ViewProduct';
import AddOrganization from '../src/pages/Organization/AddOrg';
import ViewOrganization from './pages/Organization/ViewOrganization';
import UserDashboard from './pages/user/dashboard/UserDashboard';
import UserReport from './pages/user/report/UserReport';
import UserReportListing from './pages/user/report/UserReportListing';
import ViewReport from './pages/Report/ViewReport';
import Help from './component/dialog/Help';
import AdminDashboard from './pages/admin/AdminDashboard';
import MyProduct from './pages/user/dashboard/MyProduct'
import ProfileSetting from './pages/ProfileSetting';



export const routesMap = [
    { path: "/", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/forgotpassword", element: <ForgotPassword /> },
    { path: "/resetpassword", element: <ResetPassword /> },
    { path: "/changepassword", element: <ChangePassword /> },
    { path: "/help", element: <Help /> },
    { path: "/profile-setting", element: <ProfileSetting /> ,breadcrumb: "Profile Setting"},
    { path: "/admin/reports/listing/:org_id", element: <UserReportListing /> },
    { path: "/admin/reports/listing/viewreport/:assessment_id", element: <ViewReport /> },
   
    { path: "/user/reports/listing/:org_id", element: <UserReportListing /> },
    { path: "/user/reports", element: <PrivateRoute element={UserReport} /> ,breadcrumb: "Report"},
    { path: "/user/reports/listing", element: <PrivateRoute element={UserReportListing} /> ,breadcrumb: "Report"},
    { path: "/user/reports/listing/viewreport/:assessment_id", element: <PrivateRoute element={ViewReport} /> ,breadcrumb: "View"},
    { path: "/user/dashboard", element: <PrivateRoute element={UserDashboard} />, breadcrumb: "Dashboard" },
    { path: "/user/myproduct", element: <PrivateRoute element={MyProduct} />, breadcrumb: "My Product" },
    { path: "/admin/dashboard", element: <PrivateRoute element={Dashboard} />, breadcrumb: "Dashboard" },
    { path: "/user/admin/dashboard", element: <PrivateRoute element={AdminDashboard} />, breadcrumb: "Dashboard" },
    { path: "/admin/user-management", element: <PrivateRoute element={UserManagement} />, breadcrumb: "User Management" },
    { path: "/admin/user-management/addorg", element: <PrivateRoute element={AddOrganization} />, breadcrumb: "Add Organization" },
    { path: "/admin/user-management/editorganization/:org_id", element: <PrivateRoute element={AddOrganization} />, breadcrumb: "Edit Organization" },
    { path: "/admin/user-management/vieworganization/:org_id", element: <PrivateRoute element={ViewOrganization} />, breadcrumb: "View Organization" },
    { path: "/admin/user-management/adduser/:org_id", element: <PrivateRoute element={AddUser} />, breadcrumb: "Add User" },
    { path: "/admin/user-management/edituser/:user_id", element: <PrivateRoute element={AddUser} />, breadcrumb: "Edit User" },
    { path: "/admin/user-management/viewuser/:user_id", element: <PrivateRoute element={ViewUser} />, breadcrumb: "View User" },
    { path: "/admin/role-management", element: <PrivateRoute element={RoleManagement} />, breadcrumb: "Role Management" },
    { path: "/admin/role-management/addrole", element: <PrivateRoute element={AddRole} />, breadcrumb: "Add Role " },
    { path: "/admin/role-management/editrole/:role_id", element: <PrivateRoute element={AddRole} />, breadcrumb: "Edit Role " },
    { path: "/admin/product-permission", element: <PrivateRoute element={ProductPermission} />, breadcrumb: "ProductPermission" },
    { path: "/admin/product-management", element: <PrivateRoute element={ProductManagement} />, breadcrumb: "Product Management" },
    { path: "/admin/product-management/addproduct/:org_id", element: <PrivateRoute element={AddProduct} />, breadcrumb: "Add Product" },
    { path: "/admin/product-management/editproduct/:product_id", element: <PrivateRoute element={AddProduct} />, breadcrumb: "Edit Product" },
    { path: "/admin/user-management/viewproduct/:product_id", element: <PrivateRoute element={ViewProduct} />, breadcrumb: "View Product" },
    { path: "/admin/product-management/viewservice", element: <PrivateRoute element={ViewService} />, breadcrumb: "View Product" },
    { path: "/admin/reports", element: <PrivateRoute element={Reports} />, breadcrumb: "Report" },
];

function App() {
    return (<AuthProvider>
        <Router>
            <ErrorBoundary>
                <Routes>
                    {routesMap.map((item, index) => <Route path={item.path} element={item.element} key={index} />

                    )}

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
