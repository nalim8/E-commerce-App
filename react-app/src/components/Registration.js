import { Link } from 'react-router-dom'

export function Registration() {
  return (
    <>
    <h1>Registration</h1>
    <div>
      <form>
        <label for='username'>Email</label><br/>
        <input name='username'></input><br/>
        <label for='password'>Password</label><br/>
        <input name='password'></input><br/>
      </form>
    </div>
    <div>
      <p>Go to login if you are already registered.</p>
      <Link to='/login'>Login</Link>
    </div>
    </>
  )
}