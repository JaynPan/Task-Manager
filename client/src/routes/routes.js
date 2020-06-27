import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from '../page/dashboard';
import Tasks from '../page/tasks';
import Settings from '../page/settings';
import Login from '../page/login';
import Register from '../page/register';
import AcitivateEmail from '../page/activateEmail';
import UseAuth from '../utils/use_auth';

export default function Routes() {
  const Auth = useContext(UseAuth);

  return (
    <Switch>
      <ProtectedRoute exact path="/" auth={Auth.auth} component={Dashboard} />
      <ProtectedRoute exact path="/tasks" auth={Auth.auth} component={Tasks} />
      <ProtectedRoute exact path="/settings" auth={Auth.auth} component={Settings} />
      <Route
        exact
        path="/login"
        // if user already authenticat, redirect to home page
        render={() => (!Auth.auth ? <Login /> : <Redirect to="/" />)}
      />
      <Route exact path="/register" component={Register} />
      <Route exact path="/activate" component={AcitivateEmail} />
    </Switch>
  );
}

const ProtectedRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={() => (auth ? <Component /> : <Redirect to="login" />)}
  />
);
