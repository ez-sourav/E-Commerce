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
import OrderConfirmation from "../pages/OrderConfirmation";

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
                    <Route path="/wishlist" element={<Wishlist />} />

                    <Route path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/order-confirmation"
                        element={
                            <ProtectedRoute>
                                <OrderConfirmation />
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