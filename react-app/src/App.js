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
import Checkout from './components/Checkout'
import Success from './components/Success'
import Cancel from './components/Cancel'
import Header from './components/Header'

function App() {

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const [productExist, setProductExist] = useState(null);
  const [modifiedItem, setModifiedItem] = useState(null);

  //console.log('cartItems in App', cartItems)

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartLength = cartItems.length
    if (!cartLength) {
      return;
    }

  const updateCartItems = async () => {
    try {
      //console.log('cartItems in update:', modifiedItem)
      await axios.put('http://localhost:4000/cart/items', modifiedItem)  
    } catch(error) {
      console.error(error.message);
    }
  }

  const addCartItems = async () => {
    try {
      //console.log('cartItems in add:', cartItems[cartLength - 1])
      await axios.post('http://localhost:4000/cart/items', cartItems[cartLength - 1])  
    } catch(error) {
      console.error(error.message);
    }
  }

    console.log('productExist in useEffect:', productExist)
    productExist ? updateCartItems() : addCartItems(); 
  }, [cartItems])
  
  const handleAddProduct = async (product) => {
    const existingProduct = cartItems.length > 0 ? cartItems.find((item) => item.id === product.id) : null;
    //console.log('existingProduct in handleAddProduct:', existingProduct)
    setProductExist(existingProduct)
    //console.log('productExist in handleAddProduct:', productExist)
    if (existingProduct) {
      const updatedItem = { ...existingProduct, quantity: existingProduct.quantity + 1 }
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? updatedItem : item
        )
      );
      setModifiedItem(updatedItem)
    } else {
      const newItem = { ...product, quantity: 1 };
      setCartItems([...cartItems, newItem]);
      setModifiedItem(newItem);
    }   
  }

  const handleRemoveProduct = async (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id)
    if (existingProduct.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id))
      await axios.delete(`http://localhost:4000/cart/items/${product.id}`);
    } else {
      const updatedItem = { ...existingProduct, quantity: existingProduct.quantity - 1 }
      setCartItems(
        cartItems.map((item) => 
          item.id === product.id ? 
          updatedItem
          : item
        )
      )
      setModifiedItem(updatedItem)
    }
  }

  const handleCartClearance = async () => {
    setCartItems([])
    await axios.delete(`http://localhost:4000/cart/items`)
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
          <Route path="cart/checkout/success" element={<Success />} />
          <Route path="cart/checkout/success" element={<Cancel />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )  
}

export default App;
