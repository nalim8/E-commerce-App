import './App.css';
import { Link, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Registration from './components/Registration'
import Login from './components/Login'
import Products from './components/Products'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import OrderHistory from './components/OrderHistory'
import Logout from './components/Logout'
import Header from './components/Header'

function App() {

  const handleAddProduct = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id)
    if (productExist) {
      setCartItems(cartItems.map((item) => item.id === product.id ? 
      {...productExist, quantity: productExist.quantity + 1}: item)
      );
    } else {
      setCartItems([...cartItems, {...product, quantity: 1}])
    }
  }

  const handleRemoveProduct = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id)
    if (productExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id != product.id))
    } else {
      setCartItems(
        cartItems.map((item) => 
          item.id === product.id 
            ? {...productExist, quantity: productExist.quantity - 1}
            : item
        )
      )
    }
  }

  const handleCartClearance = () => {
    setCartItems([])
  }

  return (
    <>
      <Header cartItems={cartItems} />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )  
}

export default App;
