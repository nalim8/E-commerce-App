async function getOrderData(userId) {
  const Order = new OrderModel()
  const OrderItem = new OrderItemModel()
  
  const orders = await Order.findByUser(userId);
  //console.log('orders', orders)

  const promises = orders.map(async order => {
    const items = await OrderItem.find(order.id)
    return { 
      id: order.id,
      createdAt: order.created_at,
      total: order.total,
      items: items
     }
  })


WITH cart_items AS (
  SELECT 
    cart.session_id, 
    cart.product_id, 
    cart.quantity
  FROM 
    cart
  WHERE 
    cart.session_id = $1
), order_total AS (
  SELECT 
    SUM(product.price * cart_items.quantity) AS total, 
    cart_items.session_id
  FROM 
    cart_items
    INNER JOIN product ON product.id = cart_items.product_id
  GROUP BY 
    cart_items.session_id
)
INSERT INTO 
  order_details (total, user_id)
  SELECT 
    order_total.total, 
    $2
  FROM 
    order_total
  RETURNING id