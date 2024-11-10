import { takeLatest, put, delay, select } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import {
  setIsStarted,
  setCurrentStep,
  addCompletedStep,
  updateStepProgress
} from '../slices/uploadSlice';

export const START_UPLOAD = 'upload/startUpload';
export const startUpload = createAction(START_UPLOAD);

function* handleStartUpload() {
  try {
    const { steps } = yield select(state => state.upload);
    yield put(setIsStarted(true));

    for (let i = 0; i < steps.length; i++) {
      yield put(setCurrentStep(i));
      const startTime = Date.now();
      const duration = steps[i].duration * 1000;

      while (Date.now() - startTime < duration) {
        const progress = Math.floor((Date.now() - startTime) / (duration / 100));
        if (progress <= 100) {
          yield put(updateStepProgress({ index: i, progress }));
        }
        yield delay(100);
      }

      yield put(addCompletedStep(i));
    }

    yield put(setCurrentStep(-1));
  } catch (error) {
    console.error('Error during upload:', error);
  }
}

export function* uploadSaga() {
  yield takeLatest(START_UPLOAD, handleStartUpload);
} 