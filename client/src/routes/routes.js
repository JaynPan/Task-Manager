import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from '../page/dashboard';
import Login from '../page/login';
import UseAuth from '../utils/use_auth';

export default function Routes() {
  const Auth = useContext(UseAuth);

  return (
    <Switch>
      <ProtectedRoute exact path="/" auth={Auth.auth} component={Dashboard} />
      <Route
        exact
        path="/login"
        // if user already authenticat, redirect to home page
        render={() => (!Auth.auth ? <Login /> : <Redirect to="/" />)}
      />
    </Switch>
  );
}

const ProtectedRoute = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={() => (auth ? <Component /> : <Redirect to="login" />)}
  />
);
