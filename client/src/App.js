import React from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import { FetchDELETEToken } from './components/functions/requests/FetchDELETEToken';
import useToken from './components/functions/useToken';
import useMediaQuery from '@mui/material/useMediaQuery';
import { GenerateSwitchAndRoutesForLoggedOutUser } from './components/functions/GenerateSwitchAndRoutesForLoggedOutUser';
import { GenerateSwitchAndRoutesForLoggedInUser } from './components/functions/GenerateSwitchAndRoutesForLoggedInUser';
import { CreateHeaderAndNavbar } from './components/functions/CreateHeaderAndNavbar';
export const API = 'https://bootcampcoder.herokuapp.com/api/v1/'

function App() {
  const { token, tokenId, setToken } = useToken();
  const history = useHistory();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  if (!token) {
    return GenerateSwitchAndRoutesForLoggedOutUser(setToken)
  }

  async function logout() {
    await FetchDELETEToken(tokenId, token);
    setToken('');
    history.push('/');
  }

  return (
    <div className="wrapper">
      {CreateHeaderAndNavbar(isSmallScreen, logout)}

      {GenerateSwitchAndRoutesForLoggedInUser(setToken)}
    </div>
  );
}

export default App;



