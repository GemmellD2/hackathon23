import './App.css';
import Navbar from './components/navbar.component';
import Home from "./components/home.component"
import Products from './components/products.component';
import Orders from './components/orders.component';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <div>
     
      <Navbar></Navbar>
      <BrowserRouter>
      <Routes>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
