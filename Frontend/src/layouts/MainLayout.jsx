import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
    const location = useLocation();

    const isOrderConfirmation =
        location.pathname.startsWith("/order-confirmation");

    const hideNavbar =
        location.pathname === "/payment" ||
        isOrderConfirmation;

    const hideFooter =
        location.pathname === "/cart" ||
        location.pathname === "/checkout" ||
        location.pathname === "/payment" ||
        isOrderConfirmation;

    return (
        <>
            {!hideNavbar && <Navbar />}

            <main className="pb-12 lg:pb-0">
                <Outlet />
            </main>

            {!hideFooter && <Footer />}
        </>
    );
};

export default MainLayout;