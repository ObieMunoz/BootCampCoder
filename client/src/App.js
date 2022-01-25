import { Stack } from '@mui/material';
import Button from "@mui/material/Button";
import React from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import { FetchDELETEToken } from './components/functions/requests/FetchDELETEToken';
import useToken from './components/functions/useToken';
import GitHubVisualizer from './components/GitHubVisualizer';
import Preferences from './components/Preferences';
import QuestionCreate from './components/QuestionCreate';
import QuestionDetail from './components/QuestionDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import banner from './assets/bcc-logo-60-jacks-bar-font.png';
export const API = 'https://bootcampcoder.herokuapp.com/api/v1/'

function App() {
  const { token, tokenId, setToken } = useToken();
  const history = useHistory();

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
    await FetchDELETEToken(tokenId, token);
    setToken('');
    history.push('/');
  }

  return (
    <div className="wrapper">
      <header>
        {/* <h1>Application</h1> */}
        <img src={banner} alt="BootCampCoder" />
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


