import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from "./registerReducer";

export default combineReducers({
  authReducer,
  registerReducer
});
