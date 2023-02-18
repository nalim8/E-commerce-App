import { Link } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import './Login.css';

export default function Login() {
  const { setAuth } = useContext(AuthContext)
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const google = () => {
    window.open("http://localhost:4000/auth/google");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/auth/login',
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      setAuth({ loggedIn: true, email, pwd })
      setEmail('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };
  
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to='/'>Go to Home</Link>
          </p>
        </section>
      ) : (
          <section>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              <h1>Login</h1>
              <form onSubmit={handleSubmit}>
                  <label htmlFor="email">Email address:</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  />
                  <button>Login</button>
              </form>
              <p>Log in with your Google account</p>
              <div id='googleButton'>
                <GoogleButton onClick={google} />  
              </div>
              <p>
                Need an Account?<br />
                <span className="line">
                    <Link to='/register'>Register</Link>
                </span>
              </p>
          </section>
      )}
    </>
  );
};