import React, { useState, useEffect } from 'react';
//import ProductCard from './ProductCard'
import axios from '../api/axios';
import './Products.css'

export default function Products({ handleAddProduct }) {
  
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

  /* const addItemToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:4000/cart', { product_id: product.id, quantity: 1 });
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }; */

  return (
    <>
      <h1>Products</h1>
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img className="product-image" src={product.image} alt={product.name} />
          <h1 className='product-name'>{product.name}</h1>
          <p className="product-price">{product.price}</p>
          <p className="product-desc">{product.desc}</p>
          <button onClick={() => handleAddProduct(product)}>Add to Cart</button>
        </div>
      ))}
    </>  
  );
}
