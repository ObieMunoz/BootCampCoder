import { Stack } from '@mui/material';
import Button from "@mui/material/Button";
import React from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import { FetchDELETEToken } from './components/functions/requests/FetchDELETEToken';
import useToken from './components/functions/useToken';
import GitHubAssistant from './components/GitHubAssistant';
import Preferences from './components/Preferences';
import QuestionCreate from './components/QuestionCreate';
import QuestionDetail from './components/QuestionDetail';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import useMediaQuery from '@mui/material/useMediaQuery';
export const API = 'https://bootcampcoder.herokuapp.com/api/v1/'

function App() {
  const { token, tokenId, setToken } = useToken();
  const history = useHistory();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

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
        <h1 className="mainheading">BOOTCAMPCODER</h1>
        <Stack spacing={isSmallScreen ? 1 : 3} direction={isSmallScreen ? 'column' : 'row'} textAlign="center" justifyContent="center">
          <Link to="/" style={{ textDecoration: 'none' }}><Button className="forum-buttons" variant="contained" color="primary" style={isSmallScreen ? { width: '90vw' } : { width: '20vw' }} size={isSmallScreen ? "small" : "large"}>
            Dashboard
          </Button></Link>
          <Link to="/assistant" style={{ textDecoration: 'none' }}><Button className="forum-buttons" variant="contained" color="primary" style={isSmallScreen ? { width: '90vw' } : { width: '20vw' }} size={isSmallScreen ? "small" : "large"}>
            GitHub Assistant
          </Button></Link>
          <Link to="/preferences" style={{ textDecoration: 'none' }}><Button className="forum-buttons" variant="contained" color="primary" style={isSmallScreen ? { width: '90vw' } : { width: '20vw' }} size={isSmallScreen ? "small" : "large"}>
            Preferences
          </Button></Link>
          <Button className="forum-buttons" onClick={() => logout()} variant="contained" color="primary" style={isSmallScreen ? { width: '90vw', margin: '8px auto' } : { width: '20vw' }} size={isSmallScreen ? "small" : "large"}>
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
        <Route path="/assistant">
          <GitHubAssistant />
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


