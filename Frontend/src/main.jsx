import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById('root')).render(
<CartProvider>
    <App />
</CartProvider>
  
)
