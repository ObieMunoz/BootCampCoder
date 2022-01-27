import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard';
import GitHubAssistant from '../GitHubAssistant';
import Preferences from '../Preferences';
import QuestionCreate from '../QuestionCreate';
import QuestionDetail from '../QuestionDetail';
import SignIn from '../SignIn';

export function GenerateSwitchAndRoutesForLoggedInUser(setToken) {
    return <Switch>
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
    </Switch>;
}
