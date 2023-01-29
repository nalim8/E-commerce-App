import { GoogleLogout } from 'react-google-login';

export default function Logout() {

  const onSuccess = () => {
    console.log("Log out successfull!")
  }

  return (
    <form action="/logout?_method=DELETE" method="POST">
      <button type="submit">Log out</button>
    </form>
  )
}