import { takeLatest, put, call } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';

// Action Types
export const CREATE_DEVICE_REQUEST = 'collection/createDeviceRequest';
export const CREATE_USER_REQUEST = 'collection/createUserRequest';
export const MATCH_LOG_REQUEST = 'collection/matchLogRequest';

// Action Creators
export const createDeviceRequest = createAction(CREATE_DEVICE_REQUEST);
export const createUserRequest = createAction(CREATE_USER_REQUEST);
export const matchLogRequest = createAction(MATCH_LOG_REQUEST);

// Sagas
function* handleCreateDevice(action) {
  try {
    const device = {
      ...action.payload,
      id: Date.now().toString(),
    };
    yield put(addDevice(device));
    yield put(setCreateDeviceModalOpen(false));
  } catch (error) {
    console.error('Error creating device:', error);
  }
}

function* handleCreateUser(action) {
  try {
    const user = {
      ...action.payload,
      id: Date.now().toString(),
    };
    yield put(addUser(user));
    yield put(setCreateUserModalOpen(false));
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

function* handleMatchLog(action) {
  try {
    const { userId, logPath } = action.payload;
    yield put(updateUserLogPath({ userId, logPath }));
  } catch (error) {
    console.error('Error matching log:', error);
  }
}

export function* collectionSaga() {
  yield takeLatest(CREATE_DEVICE_REQUEST, handleCreateDevice);
  yield takeLatest(CREATE_USER_REQUEST, handleCreateUser);
  yield takeLatest(MATCH_LOG_REQUEST, handleMatchLog);
} 