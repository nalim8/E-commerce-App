import React, { useState, useEffect } from 'react';
//import ProductCard from './ProductCard'
import axios from '../api/axios';
import './Products.css'

export default function Products({ handleAddProduct }) {
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  
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

  const handleCategorySelection = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };
  
  const filteredProducts = selectedCategoryId
    ? products.filter((product) => product.category_id === selectedCategoryId)
    : products;

  function FormattedPrice({price}) {
    const formattedPrice = price.toLocaleString('en-US', { style: 'currency', currency: 'EUR' });
    return <span>{formattedPrice}</span>;
  }  

  return (
    <>
      <h1>Products</h1>
      <div className="category-selector">
        <button onClick={() => handleCategorySelection(null)}>All</button>
        <button onClick={() => handleCategorySelection(1)}>City and Trekking Bikes</button>
        <button onClick={() => handleCategorySelection(2)}>Mountain Bikes</button>
        <button onClick={() => handleCategorySelection(3)}>Road Bikes</button>
        <button onClick={() => handleCategorySelection(4)}>E-Bikes</button>
      </div>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img className="product-image" src={product.image} alt={product.name} />
            <h1 className='product-name'>{product.name}</h1>
            <p className="product-price">{<FormattedPrice price={product.price} />}</p>
            <p className="product-desc">{product.desc}</p>
            <button onClick={() => handleAddProduct(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      
    </>  
  );
}
