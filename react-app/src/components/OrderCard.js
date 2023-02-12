import React, { useState } from 'react';
import './OrderCard.css'

export default function OrderCard({ order }) {

  //const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card">
      <ul className="order-data-list">
        <li className="order-data-list-item">
          <p className="order-data-list-item-title">ORDER PLACED</p>
          <p>{new Date(order.createdAt).toLocaleDateString()}</p>
        </li>
        <li className="order-data-list-item">
          <p className="order-data-list-item-title">TOTAL</p>
          <p>{order.total}</p>
        </li>
      </ul>
        <div className="details">
          <ul className="item-list">
            {order.items.map(item => (
              <li className="order-item" key={item.id}>
                <img className="order-item-image" src={item.image} />
                <p className="order-item-name">{item.name}</p>
                <p className="order-item-quantity">Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};


{/* <div className="order-card" key={order.id}>
          <ul>
            <li>
              Order Placed
              {order.createdAt}
            </li>
            <li>
              Total
              {order.total}
            </li>
          </ul>
          <h1 className='order-name'>{order.name}</h1>
          <p className="order-price">{order.price}</p>
          <p className="order-desc">{order.desc}</p>
          <button onClick={() => handleShowDetails()}>View Order Details</button>
          </div> */}