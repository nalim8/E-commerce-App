//import './ProductCard.css'

export default function ProductCard({name, desc}) {
  return ( 
    <>
      <div className='product-card'>
        <div className="product-card-header">
          <h3 className="product-card-title">{name}</h3>
        </div>
        <div className="product-card-body">
          <div className='product-desc'>{desc}</div>
        </div>
        <div className="product-card-footer">
          <button>Add to Cart</button>
        </div>
      </div>
    </>
  )
}
  