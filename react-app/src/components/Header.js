import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';
import './Header.css';

export default function Header() {
  return (
    <header className='header'>
      <div>
        <h1>
          <Link to='/' className='logo'>
            Bike Store
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
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/products">Bikes</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/cart" className='cart'>Cart</Link>
            </li>
            <li className="AuthButton">
              <AuthButton />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};