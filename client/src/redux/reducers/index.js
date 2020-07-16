import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import pollReducer from './pollReducer';

const rootReducer = combineReducers({
  auth:authReducer,
  errors:errorReducer,
  poll:pollReducer,
});

export default rootReducer