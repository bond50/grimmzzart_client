import './App.css';
import React, {lazy, Suspense, useCallback, useEffect, useRef} from 'react';
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import {UserRoute} from "./hoc/withAuthCheck";

import Loader from "./common/Loader/Loader";
import ScrollToTop from "./components/ScrollToTop";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./redux/slices/auth";


const Blog = lazy(() => import( "./pages/blog"));
const Help = lazy(() => import( "./pages/Help"));
const Contact = lazy(() => import("./pages/Contact"));
const AuthLayout = lazy(() => import("./hoc/AuthLayout"));

const UserDashboard = lazy(() => import("./pages/user/Dashboard"));

const Orders = lazy(() => import( "./pages/user/order/Orders"));
const Order = lazy(() => import( "./pages/user/order/Order"));

const CategoryHome = lazy(() => import( "./pages/category/CategoryHome"));
const SubHome = lazy(() => import( "./pages/sub/SubHome"));
const Layout = lazy(() => import("./hoc/Layout"));
const ErrorPage = lazy(() => import("./pages/errorPage/404"));
const ErrorLayout = lazy(() => import("./hoc/ErrorLayout"));
const RegisterComplete = lazy(() => import( './pages/auth/RegisterComplete'));
const Login = lazy(() => import( "./pages/auth/Login"));
const ForgotPassword = lazy(() => import( "./pages/auth/ForgotPassword"));
const PasswordReset = lazy(() => import( "./pages/auth/PasswordReset"));
const Home = lazy(() => import( "./pages/Home"));
const Register = lazy(() => import( "./pages/auth/Register"));
const WishList = lazy(() => import( "./pages/user/WishList"));
const UserProductCreate = lazy(() => import( "./pages/user/product/UserProductCreate"));
const Market = lazy(() => import( "./pages/Market"));
const Product = lazy(() => import( "./pages/Product"));
const Cart = lazy(() => import( "./pages/Cart"));
const Checkout = lazy(() => import( "./pages/Checkout"));
const Payment = lazy(() => import( "./pages/Payment"));
const Success = lazy(() => import( "./pages/user/Success"));
const Error = lazy(() => import( "./pages/user/Error"));

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        // Check if user and user token exist
        if (user && user.token) {
            const decodedToken = JSON.parse(atob(user.token.split('.')[1]));
            const currentDate = new Date();
            // Check if the token has expired
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                // If the token has expired, logout the user
                dispatch(logout());
            }
        } else {
            // If user or user token does not exist, logout the user
            dispatch(logout());
        }
    }, [dispatch]);


    return (
        <Suspense fallback={
            <Loader/>
        }>
            <ScrollToTop/>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <Routes>
                <Route element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/market" element={
                        <Market/>
                    }/>
                    <Route path="/product/:slug" element={
                        <Product/>
                    }/>
                    <Route path="category/:slug" element={
                        <CategoryHome/>
                    }/>
                    <Route path="subs/:slug" element={
                        <SubHome/>
                    }/>
                    <Route path="/cart" element={
                        <Cart/>
                    }/>
                    <Route path="/checkout" element={
                        <Checkout/>
                    }/>

                    <Route path="/blog" element={
                        <Blog/>
                    }/>
                    <Route path="/help" element={
                        <Help/>
                    }/>
                    <Route path="/help" element={
                        <Contact/>
                    }/>

                    <Route path="/payment" element={
                        <UserRoute>
                            <Payment/>
                        </UserRoute>
                    }/>

                    <Route path="user/success/:id" element={
                        <UserRoute>
                            <Success/>
                        </UserRoute>
                    }/>
                    <Route path="user/error" element={
                        <UserRoute>
                            <Error/>
                        </UserRoute>
                    }/>

                    <Route path="/checkout" element={
                        <UserRoute>
                            <Checkout/>
                        </UserRoute>
                    }/>

                    <Route path="user/dashboard" element={
                        <UserRoute>
                            <UserDashboard/>
                        </UserRoute>
                    }/>
                    <Route path="user/product" element={
                        <UserRoute>
                            <UserProductCreate/>
                        </UserRoute>
                    }/>
                    <Route path="user/wishlist" element={
                        <UserRoute>
                            <WishList/>
                        </UserRoute>
                    }/>
                    <Route path="user/orders" element={
                        <UserRoute>
                            <Orders/>
                        </UserRoute>
                    }/>

                    <Route path="user/order/:_id" element={
                        <UserRoute>
                            <Order/>
                        </UserRoute>
                    }/>

                </Route>


                <Route element={<AuthLayout/>}>
                    <Route path="auth/login" element={<Login/>}/>
                    <Route path="auth/register" element={<Register/>}/>
                    <Route path="auth/complete/:slug" element={<RegisterComplete/>}/>
                    <Route path="auth/password/forgot" element={<ForgotPassword/>}/>
                    <Route path="auth/password/reset/:token" element={<PasswordReset/>}/>
                </Route>


                <Route element={<ErrorLayout/>}>
                    <Route path='*' element={<ErrorPage noSideBar/>}/>
                </Route>

            </Routes>
        </Suspense>

    );

};

export default App;
