import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Alert from '../ui/alerts/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Businesses from '../business/Businesses';

const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/businesses' component={Businesses} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
