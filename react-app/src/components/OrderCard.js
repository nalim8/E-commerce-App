import './OrderCard.css'

export default function OrderCard({ order }) {

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
                <img className="order-item-image" src={item.image} alt={item.name} />
                <p className="order-item-name">{item.name}</p>
                <p className="order-item-quantity">Quantity: {item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
};