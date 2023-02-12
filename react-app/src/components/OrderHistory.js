import { useState, useEffect } from 'react'
import axios from '../api/axios'
import OrderCard from './OrderCard'
import './OrderHistory.css'

export default function OrderHistory() {
  
  const [orders, setOrders] = useState([])
  console.log('orders', orders)
  const [sortedOrders, setSortedOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await axios.get('http://localhost:4000/orders');
      setOrders(orderData.data);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    setSortedOrders(
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    );
  }, [orders]);
  
  return (
    <>
      <h1>My Orders</h1>
      <ul className="order-list">
        {sortedOrders.map(order =>
          <li className="order-list-item" key={order.id}>
            <OrderCard order={order} />
          </li>  
        )}
      </ul>
    </>
  )
}