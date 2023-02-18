import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import './AuthButton.css';

export default function AuthButton() {
  
  const { loggedIn, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const logout = async () => {
    try {
      await axios.get('http://localhost:4000/auth/logout');
      setAuth({ loggedIn: false });
      navigate('/auth');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loggedIn ? (
        <Link onClick={logout}>Logout</Link>
      ) : (
        <Link to="/auth">Login</Link>
      )}
    </>
  );
};
