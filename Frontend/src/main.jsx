import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AddressProvider } from "./context/AddressContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <CartProvider>
            <WishlistProvider>
                <AddressProvider>
                    <App />
                </AddressProvider>
            </WishlistProvider>
        </CartProvider>
    </AuthProvider>
);