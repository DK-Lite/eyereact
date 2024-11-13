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

    // Gather 단계
    yield put(setCurrentStep(0));
    yield put(updateStepProgress({ index: 0, progress: "데이터 수집 중..." }));
    yield delay(2000);
    yield put(addCompletedStep(0));

    // JPG 변환 단계
    yield put(setCurrentStep(1));
    for (let i = 0; i <= 100; i += 10) {
      yield put(updateStepProgress({ 
        index: 1, 
        progress: `JPG 변환 중... (${i}%)` 
      }));
      yield delay(200);
    }
    yield put(addCompletedStep(1));

    // AVI 변환 단계
    yield put(setCurrentStep(2));
    for (let i = 0; i <= 100; i += 10) {
      yield put(updateStepProgress({ 
        index: 2, 
        progress: `AVI 변환 중... (${i}%)` 
      }));
      yield delay(200);
    }
    yield put(addCompletedStep(2));

    // Minio 업로드 단계
    yield put(setCurrentStep(3));
    for (let i = 0; i <= 100; i += 10) {
      yield put(updateStepProgress({ 
        index: 3, 
        progress: `Minio 서버에 업로드 중... (${i}%)` 
      }));
      yield delay(200);
    }
    yield put(addCompletedStep(3));

    yield put(setCurrentStep(-1));
  } catch (error) {
    console.error('Error during upload:', error);
  }
}

export function* uploadSaga() {
  yield takeLatest(START_UPLOAD, handleStartUpload);
} 