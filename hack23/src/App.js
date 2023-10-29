import './App.css';
import Navbar, { NavbarWithSearch } from './components/navbar.component';
import Products from './components/products.component';
import Orders from './components/orders.component';
import { Product } from './components/product.component';
import Order from './components/order.component';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from './AuthContext';
import Login from './components/login.component';



function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
            <Route path='/' element={<Products />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products/:productId" element={<Product />} />
            <Route path="orders/:orderId" element={<Order />} />
            <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
