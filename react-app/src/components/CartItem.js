export default function CartItem({name, desc}) {
  return (
    <div className='cart-card'>
      <div className="cart-card-header">
        <h3 className="cart-card-title">{name}</h3>
      </div>
      <div className="cart-card-body">
        <div className='cart-product'></div>
      </div>
      <div className="cart-card-footer">{desc}</div>
    </div>
  )
}