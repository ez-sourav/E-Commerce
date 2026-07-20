import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer'
import { Outlet } from "react-router-dom"
const MainLayout = () => {

    return (
        <>
            <Navbar />
            <main className='pb-12 lg:pb-0'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout