//cimport { ThirdPartyLogin } from './ThirdPartyLogin'
import { Link } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';

const clientId = "247075986295-4vbl0i6k41shj27034245e19kh49oqrp.apps.googleusercontent.com";

export function Login() {
  
  const onSuccess = (res) => {
    console.log("LOGIN SUCESS! Current user: ", res.profileObj)
  }

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res)
  }
  
  return (
    <>
      <h1>Login</h1>
      <div>
        <form>
          <label for='email'>Email address</label><br/>
          <input name='email'></input><br/>
          <label for='password'>Password</label><br/>
          <input name='password'></input><br/>
        </form>
      </div>
      <div id='signInButton'>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />  
      </div>
      <div>
        <Link to='/registration'>Register</Link>
      </div>
    </>
  )
}