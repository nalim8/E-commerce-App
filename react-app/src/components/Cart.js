import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import './Cart.css';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Cart({ cartItems, handleAddProduct, handleRemoveProduct, handleCartClearance }) {

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    if (cartItems.length) {
      cartItems.forEach(item => {
        const price = parseFloat(item.price.replace(/\./g, '').replace(',', '.').replace(' €', ''));
        total += price * item.quantity;
      });
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems]);

  const handleCheckout = async () => {
    try {
      const response = await axios.get('http://localhost:4000/cart/checkout');
      console.log(response.data.url);
      window.location.replace(response.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Cart</h1>
      <div className='cart-item'>
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
                <button className='cart-item-add' onClick={() => handleAddProduct(item)}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <button className='cart-item-remove' onClick={() => handleRemoveProduct(item)}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
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
};
