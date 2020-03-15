import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes/routes';
import UseAuth from './utils/use_auth';

export default function App() {
  const [auth, setAuth] = useState(false);
  const readCookie = async () => {
    const token = Cookies.get('token');

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
      }
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      <UseAuth.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </UseAuth.Provider>
    </div>
  );
}
