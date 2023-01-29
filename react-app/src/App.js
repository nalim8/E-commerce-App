import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom'
import axios from './api/axios';
import Home from './components/Home'
import Registration from './components/Registration'
import Login from './components/Login'
import Products from './components/Products'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import OrderHistory from './components/OrderHistory'
import Logout from './components/Logout'
import Header from './components/Header'

function App() {

  const [cartItems, setCartItems] = useState([])
  console.log(cartItems)
  
  const handleAddProduct = async (product) => {
    try {
      const productExist = cartItems.find((item) => item.id === product.id)
      if (productExist) {
        setCartItems(cartItems.map((item) => item.id === product.id ? 
        {...productExist, quantity: productExist.quantity + 1} 
        : item)
        );
      } else {
        setCartItems([...cartItems, {...product, quantity: 1}])
      }

      const itemDataToServer = cartItems.map(item => ({
        cartItemId: item.id,
        quantity: item.quantity
      }))

      const response = await axios.put(`http://localhost:4000/cart/items`, itemDataToServer);
      console.log(response.data);

    } catch(error) {
      console.error(error.message);
    }
      
  }

  const handleRemoveProduct = async (product) => {
    const productExist = cartItems.find((item) => item.id === product.id)
    if (productExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id))
    } else {
      setCartItems(
        cartItems.map((item) => 
          item.id === product.id ? 
          {...productExist, quantity: productExist.quantity - 1}
          : item
        )
      )
    }
  }

  const handleCartClearance = async () => {
    setCartItems([])
  }

  const props = { 
    cartItems: cartItems, 
    handleAddProduct: handleAddProduct,
    handleRemoveProduct: handleRemoveProduct, 
    handleCartClearance: handleCartClearance 
  }

  return (
    <>
      <Header />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/products" element={<Products handleAddProduct={handleAddProduct}/>} />
          <Route path="/cart" element={<Cart {...props} />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )  
}

export default App;
