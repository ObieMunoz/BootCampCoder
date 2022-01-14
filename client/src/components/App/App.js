import React from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Login from '../Authentication/Login';
import Preferences from '../Pages/Preferences';
import useToken from './useToken';
import Registration from '../Authentication/Registration';
import './App.css';
import GitHubVisualizer from '../Pages/GitHubVisualizer';
import Button from "@mui/material/Button"
import { Stack } from '@mui/material';
import QuestionDetail from '../Pages/QuestionDetail';

function App() {
  const { token, tokenId, setToken } = useToken();
  const history = useHistory();

  if (!token) {
    return <div style={{ textAlign: "center" }}>
      <h1>Application</h1>
      <br />
      <Login setToken={setToken} />
      <Registration setToken={setToken} />
    </div>
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
        <Stack spacing={10} direction="row" textAlign="center" justifyContent="center">
          <Link to="/" style={{ textDecoration: 'none' }}><Button className="forum-buttons" variant="contained" color="primary" size="large">
            Dashboard
          </Button></Link>
          <Link to="/preferences" style={{ textDecoration: 'none' }}><Button className="forum-buttons" variant="contained" color="primary" size="large">
            Preferences
          </Button></Link>
          <Link to="/visualizer" style={{ textDecoration: 'none' }}><Button className="forum-buttons" variant="contained" color="primary" size="large">
            GitHub Visualizer
          </Button></Link>
          <Button className="forum-buttons" onClick={() => logout()} variant="contained" color="primary" size="large">
            Logout
          </Button>
        </Stack>
      </header>

      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="/preferences">
        <Preferences />
      </Route>
      <Route path="/visualizer">
        <GitHubVisualizer />
      </Route>
      <Route path="/questions/:question_id">
        <QuestionDetail />
      </Route>
    </div>
  );
}

export default App;