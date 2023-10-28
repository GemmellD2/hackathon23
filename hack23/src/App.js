import './App.css';
import Navbar from './components/navbar.component';
import Home from "./components/home.component"
import Products from './components/products.component';
import Orders from './components/orders.component';
import { Product } from './components/product.component';
import Order from './components/order.component';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";



function App() {
  return (
    <ThemeProvider>
    <div>
      <Navbar></Navbar>
      <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products/:productId" element={<Product />} />
          <Route path="orders/:orderId" element={<Order />} />
      </Routes>
    </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
