import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import business from './business';

export default combineReducers({
  alert,
  auth,
  business,
});
