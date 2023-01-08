import { GoogleLogout } from 'react-google-login';

const clientId = "247075986295-4vbl0i6k41shj27034245e19kh49oqrp.apps.googleusercontent.com";

export function Logout() {

  const onSuccess = () => {
    console.log("Log out successfull!")
  }

  return (
    <div id='signOutButton'>
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}