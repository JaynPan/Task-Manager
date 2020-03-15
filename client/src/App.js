import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes/routes';
import UseAuth from './utils/use_auth';

export default function App() {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const fetchUser = async () => {
    const token = Cookies.get('access_token');

    if (token) {
      // fetch "/users/me" to check token is valid or not
      const res = await fetch('/users/me', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setAuth(true);

        const json = await res.json();
        setUser(json);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="App">
      <UseAuth.Provider value={{
        auth, setAuth, user, setUser,
      }}
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </UseAuth.Provider>
    </div>
  );
}
