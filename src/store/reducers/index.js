import { combineReducers } from 'redux';
import navigationReducer from '../slices/navigationSlice';

const rootReducer = combineReducers({
  navigation: navigationReducer,
});

export default rootReducer; 