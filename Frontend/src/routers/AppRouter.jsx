import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Wishlist from '../pages/Wishlist'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFoundPage'
import Checkout from '../pages/Checkout'
import MainLayout from '../layouts/MainLayout'

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/shop' element={<Shop />} />
                    <Route path='/product/:id' element={<ProductDetails />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/wishlist' element={<Wishlist />} />
                    <Route path='/checkout' element={<Checkout />} />
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter