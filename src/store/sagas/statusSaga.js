import { takeLatest, put, call } from 'redux-saga/effects';
import * as types from '../actions/types';
import { fetchStatusSuccess, fetchStatusFailure } from '../actions/statusActions';

// API 호출 함수 예시
const fetchStatusAPI = async () => {
  // API 호출 로직
  const response = await fetch('your-api-endpoint');
  return response.json();
};

function* fetchStatusSaga() {
  try {
    const data = yield call(fetchStatusAPI);
    yield put(fetchStatusSuccess(data));
  } catch (error) {
    yield put(fetchStatusFailure(error.message));
  }
}

export default function* statusSaga() {
  yield takeLatest(types.FETCH_STATUS, fetchStatusSaga);
} 