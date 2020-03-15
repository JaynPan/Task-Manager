import React, { useContext } from 'react';
import Cookies from 'js-cookie';

import UseAuth from '../utils/use_auth';

export default function Login() {
  const Auth = useContext(UseAuth);
  const handleLogout = () => {
    Auth.setAuth(false);
    Cookies.remove('access_token');
  };

  return (
    <button type="button" onClick={handleLogout}>Logout</button>
  );
}
