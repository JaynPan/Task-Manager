import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [input, setInput] = useState({ email: "", password: "" })
  const [errorMsg, setErrorMsg] = useState("")
  const [profile, setProfile] = useState({})
  const handleInputChange = (e) => {
    setErrorMsg('')
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  const login = (e) => {
    e.preventDefault()
    if(input.email.trim().length === 0 || input.password.trim().length === 0) {
      return setErrorMsg("Please input email and password.")
    }

    fetch('/users/login', {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      return res.json()
    }).then(profile => {
      setProfile(profile)
    }).catch(e => {
      console.log(e)
    })
  }

  return (
    <div className="App">
      {errorMsg.length !== 0 && <b>{errorMsg}</b>}
      <form onSubmit={login}>
        <label>
          Email
          <input type="text" name="email" onChange={handleInputChange}></input>
        </label>
        <label>
          Password
          <input type="text" name="password" onChange={handleInputChange}></input>
        </label>
        <input type='submit'  value="login" />
      </form>
      <div>
        {Object.keys(profile).length !== 0 && <p>{profile.user.name}</p>}
      </div>
    </div>
  );
}

export default App;
