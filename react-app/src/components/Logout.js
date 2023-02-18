import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Logout.css';

export default function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      setIsLoggingOut(true);
      try {
        await axios.get('http://localhost:4000/auth/logout');
        navigate('/auth');
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoggingOut(false);
      }
    };
    logout();
  }, [navigate]);

  return (
    <div className="logout-container">
      <p className="logout-text">
        {isLoggingOut ? 'Logging out...' : 'Logout failed.'}
      </p>
    </div>
  );
};
