import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../auth/Login';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
    </Switch>
  );
};

export default Routes;
