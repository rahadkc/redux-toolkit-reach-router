import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../containers/counter/counterSlice';
import loginReducer from '../containers/login/loginSlice';

const entities = combineReducers({
  counter: counterReducer,
  login: loginReducer
})

export default combineReducers({
  entities
})