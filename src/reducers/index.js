import * as T from '../constants/actionTypes';

export default (state={}, action) => {
  switch (action.type) {
    case T.UPDATE_START_DATE:
      return { ...state, selectedStartDate: action.payload };
    case T.UPDATE_END_DATE:
      return { ...state, selectedEndDate: action.payload };
    case T.UPDATE_DATA_TYPE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
