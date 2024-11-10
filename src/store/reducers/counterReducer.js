import * as types from '../actions/types';

const initialState = {
  value: 0
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        value: state.value + 1
      };
    case types.DECREMENT:
      return {
        ...state,
        value: state.value - 1
      };
    default:
      return state;
  }
};

export default counterReducer; 