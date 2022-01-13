import React from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Login from '../Authentication/Login';
import Preferences from '../Pages/Preferences';
import useToken from './useToken';
import Registration from '../Authentication/Registration';
import WhoAmI from '../Authentication/WhoAmI';
import './App.css';
import GitHubVisualizer from '../Pages/GitHubVisualizer';

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
      <header>
        <h1>Application</h1>
        <nav>
          <Link to="/"><div>Dashboard</div></Link>
          <Link to="/preferences"><div>Preferences</div></Link>
          <Link to="/me"><div>Me</div></Link>
          <Link to="/visualizer"><div>GitHub Visualizer</div></Link>
          <div onClick={() => logout()}>Logout</div>
        </nav>
      </header>

      <Route exact path=" /">
        <Dashboard />
      </Route>
      <Route path="/preferences">
        <Preferences />
      </Route>
      <Route path="/me">
        <WhoAmI />
      </Route>
      <Route path="/visualizer">
        <GitHubVisualizer />
      </Route>
    </div>
  );
}

export default App;