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
} from '../actions/types';

const initialState = {
  business: null,
  businesses: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BUSINESSES:
      return {
        ...state,
        businesses: payload,
        loading: false,
      };
    case BUSINESS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_BUSINESS:
      return {
        ...state,
        business: null,
        loading: false,
      };
    default:
      return state;
  }
}
