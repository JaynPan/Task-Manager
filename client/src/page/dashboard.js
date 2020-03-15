import React, { useContext } from 'react';
import Cookies from 'js-cookie';

import UseAuth from '../utils/use_auth';

export default function Dashboard() {
  const Auth = useContext(UseAuth);
  const handleLogout = () => {
    Auth.setAuth(false);
    Cookies.remove('token');
  };

  return (
    <div>
      <h3>Home</h3>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
}
