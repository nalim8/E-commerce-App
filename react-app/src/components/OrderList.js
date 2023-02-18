import React, { useState, useEffect } from 'react';

export default function OrderList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:4000/orders');
      const data = await response.json();
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div className='order-list'>
      {data.map((item) => (
        <div className='order-card'>
          <div className="order-card-header">
            <h3 className="order-card-title">{item.name}</h3>
          </div>
          <div className="order-card-body">
            <div className='order-product'></div>
          </div>
          <div class="order-card-footer">{item.body}</div>
        </div>
      ))}
    </div>
  );
};
