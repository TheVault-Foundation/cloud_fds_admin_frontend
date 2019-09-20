import { combineReducers } from 'redux';

import auth from './authReducer';
import register from "./registerReducer";

export default combineReducers({
  auth,
  register
});
