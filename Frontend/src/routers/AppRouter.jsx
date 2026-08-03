import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Wishlist from '../pages/Wishlist'
import Profile from "../pages/Profile"
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFoundPage'
import Checkout from '../pages/Checkout'
import MainLayout from '../layouts/MainLayout'
import { Toaster } from "sonner";
import ProtectedRoute from '../components/auth/ProtectedRoute'
import PublicRoute from "../components/auth/PublicRoute";
import Payment from "../pages/Payment";
import OrderConfirmation from "../pages/OrderConfirmation";
import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";
import ManageAddresses from "../pages/ManageAddresses";

const AppRouter = () => {

    return (
        <BrowserRouter>

            <Toaster
                richColors
                position="top-center"
                closeButton
                duration={1800}
                theme="light"
            />

            <Routes>

                <Route element={<MainLayout />}>

                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist"
                        element={
                            <ProtectedRoute>
                                <Wishlist />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/payment"
                        element={
                            <ProtectedRoute>
                                <Payment />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/order-confirmation/:orderId"
                        element={
                            <ProtectedRoute>
                                <OrderConfirmation />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/addresses"
                        element={
                            <ProtectedRoute>
                                <ManageAddresses />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <MyOrders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders/:orderId"
                        element={
                            <ProtectedRoute>
                                <OrderDetails />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                <Route path="*" element={<NotFound />} />

            </Routes>

        </BrowserRouter>
    )
}

export default AppRouter