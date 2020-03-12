import React, { useState, useEffect } from "react";
import { getCookie } from "./utils/cookies";
import "./App.css";

function App() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [profile, setProfile] = useState({});
  const handleInputChange = e => {
    setErrorMsg("");
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };
  const login = e => {
    e.preventDefault();
    if (input.email.trim().length === 0 || input.password.trim().length === 0) {
      return setErrorMsg("Please input email and password.");
    }

    fetch("/users/login", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(`${res.status}, ${res.statusText}`);
        }
      })
      .then(profile => {
        document.cookie = `access_token=${profile.token}; SameSite=Strict`;
        setIsAuthenticated(true);
        setProfile(profile.user);
      })
      .catch(e => {
        console.warn(e);
      });
  };

  useEffect(() => {
    fetch("/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("access_token") || ""}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(`${res.status}, ${res.statusText}`);
        }
      })
      .then(data => {
        setIsAuthenticated(true);
        setProfile(data);
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="App">
      {errorMsg.length !== 0 && <b>{errorMsg}</b>}
      {!isAuthenticated ? (
        <div>
          <form onSubmit={login}>
            <label>
              Email
              <input
                type="text"
                name="email"
                onChange={handleInputChange}
              ></input>
            </label>
            <label>
              Password
              <input
                type="text"
                name="password"
                onChange={handleInputChange}
              ></input>
            </label>
            <input type="submit" value="login" />
          </form>
        </div>
      ) : (
        <div>
          {Object.keys(profile).length !== 0 && <p>Hi, {profile.name}!</p>}
        </div>
      )}
    </div>
  );
}

export default App;
