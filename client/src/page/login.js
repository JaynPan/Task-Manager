import React, { useContext } from 'react';
import Cookies from 'js-cookie';

import UseAuth from '../utils/use_auth';

export default function Login() {
  const Auth = useContext(UseAuth);
  const handleLogin = () => {
    // post request "/users/login"

    Auth.setAuth(true);
    Cookies.set('token', 'logintrue');
  };

  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={handleLogin}>Login</button>
    </div>
  );
}
