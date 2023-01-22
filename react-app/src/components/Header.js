import { Link } from 'react-router-dom';
import './Header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Header({cartItems}) {
  return (
    <header className='header'>
      <div>
        <h1>
          <Link to='/' className='logo'>
            Electronics Shop
          </Link>
        </h1>
      </div>
      <div className='header-navigation'>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
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
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/cart" className='cart'>
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                <span className='cart-length'>
                  {cartItems.length === 0 ? "" : cartItems.length}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}