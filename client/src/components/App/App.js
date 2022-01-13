import React from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import './App.css';
import Dashboard from '../Pages/Dashboard';
import Login from '../Authentication/Login';
import Preferences from '../Pages/Preferences';
import useToken from './useToken';
import Registration from '../Authentication/Registration';
import WhoAmI from '../Authentication/WhoAmI';

function App() {
  const { token, tokenId, setToken } = useToken();
  const history = useHistory();

  if (!token) {
    return <>
      <Login setToken={setToken} />
      <Registration setToken={setToken} />
    </>
  }

  async function logout() {
    console.log(token)
    await fetch('http://localhost:3000/api-keys/' + tokenId, {
      method: 'DELETE',
      headers: new Headers({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    setToken('');
    history.push('/');
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <Link to="/">Dashboard</Link>
      <Link to="/preferences">Preferences</Link>
      <Link to="/me">Me</Link>
      <div onClick={() => logout()}>Logout</div>

      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="/preferences">
        <Preferences />
      </Route>
      <Route path="/me">
        <WhoAmI token={token} />
      </Route>
    </div>
  );
}

export default App;