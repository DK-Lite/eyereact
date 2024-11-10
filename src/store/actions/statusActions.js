import * as types from './types';

export const fetchStatus = () => ({
  type: types.FETCH_STATUS,
});

export const fetchStatusSuccess = (data) => ({
  type: types.FETCH_STATUS_SUCCESS,
  payload: data,
});

export const fetchStatusFailure = (error) => ({
  type: types.FETCH_STATUS_FAILURE,
  payload: error,
});

export const setStatus = (status) => ({
  type: types.SET_STATUS,
  payload: status,
}); 