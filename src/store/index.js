import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import navigationReducer from './slices/navigationSlice';
import collectionReducer from './slices/collectionSlice';
import uploadReducer from './slices/uploadSlice';
import { collectionSaga } from './sagas/collectionSaga';
import { uploadSaga } from './sagas/uploadSaga';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    collectionSaga(),
    uploadSaga(),
  ]);
}

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    collection: collectionReducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga); 