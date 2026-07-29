import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <CartProvider>
            <App />
        </CartProvider>
    </AuthProvider>

)
