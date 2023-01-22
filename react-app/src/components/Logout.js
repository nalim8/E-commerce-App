import { GoogleLogout } from 'react-google-login';

export default function Logout() {

  const onSuccess = () => {
    console.log("Log out successfull!")
  }

  return (
    <div id='signOutButton'>
      
    </div>
  )
}