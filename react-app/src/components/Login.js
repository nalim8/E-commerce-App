import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import { GoogleButton } from 'react-google-button'
import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from "../context/AuthProvider";
import axios from '../api/axios';
import './Login.css'

const LOGIN_URL = '/login';

export default function Login() {
  //const { setAuth } = useContext(AuthContext);
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      //const accessToken = response?.data?.accessToken;
      //const roles = response?.data?.roles;
      //setAuth({ user, pwd, roles, accessToken });
      setUser('');
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
  }

  const onSuccess = (res) => {
    console.log(`LOGIN SUCCESS! Current user: ${res.profileObj}`)
  }

  const onFailure = (res) => {
    console.log(`LOGIN FAILED! result: ${res.profileObj}`)
  }
  
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
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
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
              <div id='signInButton'>
                <GoogleButton/>  
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
  )
}