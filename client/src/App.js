import React, { useState, useEffect } from 'react';

import LoginForm from './login_form';
import { getCookie } from './utils/cookies';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch('/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('access_token') || ''}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(`${res.status}, ${res.statusText}`);
      })
      .then((data) => {
        setIsAuthenticated(true);
        setProfile(data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LoginForm />
      ) : (
        <div>
          {Object.keys(profile).length !== 0 && (
          <p>
            {`Hi, ${profile.name}!`}
          </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
