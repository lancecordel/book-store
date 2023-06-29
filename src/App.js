import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/appComponents/LandingPage';
import Navbar from './components/appComponents/components/Navbar';
import CartPage from './components/appComponents/CartPage';
import SearchPage from './components/appComponents/SearchPage';
import ProductPage from './components/appComponents/ProductPage';
import AdminPage from './components/adminComponents/AdminPage';
import RegisterPage from './components/appComponents/RegisterPage';
import Login from './components/appComponents/components/Login';
import LoginPage from './components/appComponents/LoginPage';
import CheckoutPage from './components/appComponents/checkoutPage';
import OrdersPage from './components/appComponents/OrdersPage';



const container = {
  // border:'1px solid',
  width:'100%',
  position:'absolute',
  top:'0px',
  left:'0px',
  height:'95vh',
  minWidth:'700px'
}

function App() {
  return (
    <BrowserRouter>
    <div style={container}>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/product' element={<ProductPage/>}/>
        <Route path='/admin/upload' element={<AdminPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/orders' element={<OrdersPage/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
