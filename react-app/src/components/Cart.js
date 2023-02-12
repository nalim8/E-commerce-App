import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
//import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom"
import axios from '../api/axios';
import './Cart.css'
//import { add, mul } from 'money-math'

export default function Cart({ cartItems, handleAddProduct, handleRemoveProduct, handleCartClearance }) {

  console.log('cartItems in Cart:', cartItems)

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    if (cartItems.length) {
      cartItems.forEach(item => {
        total += item.price * item.quantity;
      });
      setTotalPrice(total);
    } else {
      setTotalPrice(0)
    }
  }, [cartItems]);

  /* useEffect(() => {
    if (cartItems.length) {
      setTotalPrice(cartItems[0].grand_total);
    } else {
      setTotalPrice(0)
    }
  }, [cartItems]); */

  const handleCheckout = async () => {
    try {
      const response = await axios.get('http://localhost:4000/cart/checkout')
      console.log(response.data.url)
      //navigate(response.data.url, {replace: true});
      window.location.replace(response.data.url)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='cart-item'>
        <h2 className='cart-item-header'>Cart Items</h2>
        <div className='clear-cart'>
          {cartItems.length >= 1 && (
            <button className='clear-cart-button' onClick={handleCartClearance}>Clear Cart</button>
          )}
        </div>

        {cartItems.length === 0 && (
          <div className='cart-item-empty'>No items are added.</div>
        )}

        <div>
          {cartItems.length && cartItems.map((item) => (
            <div key={item.id} className='cart-item-list'>
              <img
                className='cart-item-image' 
                src={item.image}
                alt={item.name} 
              />
              <div className='cart-item-name'>{item.name}</div>
              <div className='cart-item-function'>
                <button className='cart-item-add' onClick={() => handleAddProduct(item)}>+</button>
                <button className='cart-item-remove' onClick={() => handleRemoveProduct(item)}>-</button>
              </div> 
              <div className='cart-item-price'>
                {item.quantity} * {item.price}
              </div> 
            </div>   
          ))}
        </div>
              
      {cartItems.length >=1 && 
        <p className='cart-item-total-price'>
          Total price: {totalPrice} € 
        </p> }   
      </div>
      <div>
        <button className={`checkout-button ${cartItems.length === 0 && 'disabled'}`} onClick={handleCheckout}>
          Check out
        </button>
      </div>
    </>
  );
}
