import { Link } from 'react-router-dom';
import './Header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAtom } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  return (
    <header className='header'>
      <div>
        <h1>
          <Link to='/' className='logo'>
            Candy Shop
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
              <FontAwesomeIcon icon={faAtom} />
                <span className='cart-length'>
                  {/* {cartItems.length === 0 ? "" : cartItems.length} */}
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}