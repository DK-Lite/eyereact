import { all } from 'redux-saga/effects';
import statusSaga from './statusSaga';

export default function* rootSaga() {
  yield all([
    statusSaga(),
  ]);
} 