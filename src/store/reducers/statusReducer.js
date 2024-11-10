import * as types from '../actions/types';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_STATUS:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case types.FETCH_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.SET_STATUS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default statusReducer; 