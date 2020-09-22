import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Alert from '../ui/alerts/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
