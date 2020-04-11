import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import Routes from './routes/routes';
import UseAuth from './utils/use_auth';

export default function App() {
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    const token = Cookies.get('access_token');
    setLoading(true);

    if (token) {
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

        // fetching avatar
        const resAvatar = await fetch(`users/${json._id}/avatar`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (resAvatar.status === 200) {
          const blob = await resAvatar.blob();
          const objURL = URL.createObjectURL(blob);

          setAvatar(objURL);
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <LoadingOutlined
        style={{
          color: '#fff',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '4em',
        }}
      />
    );
  }

  return (
    <div className="App">
      <UseAuth.Provider value={{
        auth, setAuth, user, setUser, avatar, setAvatar,
      }}
      >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </UseAuth.Provider>
    </div>
  );
}
