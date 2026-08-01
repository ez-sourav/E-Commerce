import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

import { Outlet,useLocation  } from "react-router-dom"
const MainLayout = () => {
const location = useLocation();
const hideFooter = [
    "/cart",
    "/checkout",
    "/payment",
    "/order-confirmation",
].includes(location.pathname);
    return (
        <>
            <Navbar />
            <main className='pb-12 lg:pb-0'>
                <Outlet />
            </main>
           {!hideFooter && <Footer />}
        </>
    )
}

export default MainLayout