import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from '../SignIn';
import SignUp from '../SignUp';

export function GenerateSwitchAndRoutesForLoggedOutUser(setToken) {
    return <>
        <Switch>
            <Route exact path="/">
                <SignIn setToken={setToken} />
            </Route>
            <Route exact path="/signup">
                <SignUp setToken={setToken} />
            </Route>
        </Switch>
    </>;
}
