import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AddressProvider } from "./context/AddressContext.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <CartProvider>
            <AddressProvider>
                <App />
            </AddressProvider>
        </CartProvider>
    </AuthProvider>
);