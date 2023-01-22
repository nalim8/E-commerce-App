import React, { useState, useEffect } from 'react';
import ProductCard from './ProductList'
import axios from '../api/axios';
import './ProductList.css'

export default function ProductList({handleAddProduct}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    axios
      .get('http://localhost:4000/products')
      .then(res => {
        console.log(res)  
        setProducts(res.data)
      })  
      .catch(err => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <>
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img className="product-image" src={product.image} alt={product.name} />
          <h1 className='product-name'>{product.name}</h1>
          <p className="product-price">{product.price}</p>
          <p className="product-desc">{product.desc}</p>
          <p><button onClick={handleAddProduct(product)}>Add to Cart</button></p>
        </div>
      ))}
    </>  
  );
}



/* useEffect(() => {
  async function fetchData() {
    const response = await fetch('http://localhost:4000/products');
    const data = await response.json();
    setProducts(data);
    setLoading(false);
  }
  fetchData();
}, []); */