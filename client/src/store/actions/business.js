import axios from 'axios';
import { setAlert } from './alert';

import {
  CREATE_BUSINESS_SUCCESS,
  CREATE_BUSINESS_FAIL,
  CREATE_BUSINESS_CATEGORY_SUCCESS,
  CREATE_BUSINESS_CATEGORY_FAIL,
  GET_BUSINESS,
  GET_BUSINESSES,
  BUSINESS_ERROR,
  UPDATE_BUSINESS,
  BUSINESS_DELETED,
  UPDATE_FAVORITES,
  ADD_REVIEW,
  REMOVE_REVIEW,
  REPLY_TO_REVIEW,
  REMOVE_REVIEW_REPLY,
  CLEAR_BUSINESS,
} from './types';

// get all businesses
export const getBusinesses = () => async (dispatch) => {
  dispatch({ type: CLEAR_BUSINESS });
  try {
    const res = await axios.get('/api/business');

    dispatch({
      type: GET_BUSINESSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BUSINESS_ERROR,
      paylod: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
