import { ProductList } from './ProductList'
import { products } from '../data/product_data'
import React from 'react'

export function Products() {
 return (
  <>
  <ProductList products={products} />
  </>
 )
}

// 
  