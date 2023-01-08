//import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home'
import { Registration } from './components/Registration'
import { Login } from './components/Login'
//import { Session } from './components/Session'
//import { Products } from './components/Products'
import { NotFound } from './components/NotFound'
import { Cart } from './components/Cart'
import { OrderHistory } from './components/OrderHistory'
//import { Checkout } from './components/Checkout'
import { Logout } from './components/Logout'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'

const clientId = "247075986295-4vbl0i6k41shj27034245e19kh49oqrp.apps.googleusercontent.com"

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  })

  return (
    <>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Registration</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </nav>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/products" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )  
}

export default App;
