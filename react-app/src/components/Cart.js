import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import './Cart.css'

export default function Cart({ cartItems, handleAddProduct, handleRemoveProduct, handleCartClearance }) {

  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0)
  console.log(totalPrice)

  return (
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
          {cartItems.map((item) => (
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

        <div className='cart-item-total-price-name'>
          Total price
          <div className='cart-item-total-price'>
            {totalPrice} €
          </div>
        </div>    
    </div>
  );
}
