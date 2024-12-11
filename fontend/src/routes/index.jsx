import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../papes/Login";
import Signup from "../papes/Signup";
import AdminPanel from "../papes/AdminPanel";
import AllProducts from "../papes/AllProducts";
import AllUsers from "../papes/AllUsers";
import Home from "../papes/Home";
import CategoryProduct from "../papes/CategoryProduct";
import ProductDetails from "../papes/ProductDetails";
import Cart from "../papes/Cart";
import SearchProduct from "../papes/SearchProduct";
import VerifyEmail from "../papes/VerifyEmail";
import ForgotPassword from "../papes/ForgotPassword";
import ResetPasswordPage from "../papes/ResetPassword";
import Dashboard from "../component/Dashboard"
import PersonnelAdmin from "../papes/PersonnelPanel";
import TranitionProduct from "../papes/TranitionProduct";



const router = createBrowserRouter([
    {
        path: "/",
        element: <App/> ,
        children : 
        [   
            {
                path :"",
                element :<Home/>
            },
            {
                path :"login",
                element :<Login/>
            },
            {
                path :"signup",
                element :<Signup/>
            },
            {
                path :"verify-email",
                element :<VerifyEmail/>
            },
            {
                path :"forgot-password",
                element :<ForgotPassword/>
            },
            {
                path :"reset-password/:token",
                element :<ResetPasswordPage/>
            },
            {
                path:"product-category/",
                element:<CategoryProduct/>
            },
            {
                path:"product/:id",
                element:<ProductDetails/>
            },
            {
                path:"/cart",
                element:<Cart/>
            },
            {
                path:"/search",
                element:<SearchProduct/>
            },
        ]
    },
    {
        path : "/admin-panel",
        element : <AdminPanel/>,
        children : [
            {
                path : "all-users",
                element : <AllUsers/>
            },
            {
                path : "all-products",
                element : <AllProducts/>
            },
            {
                path : "dashboard",
                element :<Dashboard/>
            },
        ]
    },
    {
        path : "/personnel-panel",
        element : <PersonnelAdmin/>,
        children : [
            {
                path : "tran-product",
                element : <TranitionProduct/>
            },
        ]
    }
]);

export default router;