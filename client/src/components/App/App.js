import React from 'react';
import { Route, Link, useHistory, Switch } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Preferences from '../Pages/Preferences';
import useToken from './useToken';
import './App.css';
import GitHubVisualizer from '../Pages/GitHubVisualizer';
import Button from "@mui/material/Button"
import { Stack } from '@mui/material';
import QuestionDetail from '../Pages/QuestionDetail';
import QuestionCreate from '../Pages/QuestionCreate';
import SignIn from '../Authentication/SignIn';
import SignUp from '../Authentication/SignUp';
export const API = 'https://bootcampcoder.herokuapp.com/api/v1/'

function App() {
  const { token, tokenId, setToken } = useToken();
  const history = useHistory();

  // if (!token) {
  //   return <div style={{ textAlign: "center" }}>
  //     <h1>Application</h1>
  //     <br />
  //     <Login setToken={setToken} />
  //     <Registration setToken={setToken} />
  //   </div>
  // }

  if (!token) {
    return <>
      <Switch>
        <Route exact path="/">
          <SignIn setToken={setToken} />
        </Route>
        <Route exact path="/signup">
          <SignUp setToken={setToken} />
        </Route>
      </Switch>
    </>
  }

  async function logout() {
    await fetch(API + 'api-keys/' + tokenId, {
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
          <Link to="/visualizer" style={{ textDecoration: 'none' }}><Button className="forum-buttons" variant="contained" color="primary" size="large">
            GitHub Visualizer
          </Button></Link>
          <Link to="/preferences" style={{ textDecoration: 'none' }}><Button className="forum-buttons" variant="contained" color="primary" size="large">
            Preferences
          </Button></Link>
          <Button className="forum-buttons" onClick={() => logout()} variant="contained" color="primary" size="large">
            Logout
          </Button>
        </Stack>
      </header>

      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/preferences">
          <Preferences />
        </Route>
        <Route path="/visualizer">
          <GitHubVisualizer />
        </Route>
        <Route path="/questions/new">
          <QuestionCreate />
        </Route>
        <Route path="/questions/:question_id">
          <QuestionDetail />
        </Route>
        <Route path="/signin">
          <SignIn setToken={setToken} />
        </Route>
        <Route path="*">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;