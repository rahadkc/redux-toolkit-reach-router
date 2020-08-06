import {combineReducers} from '@reduxjs/toolkit';
import apiReducer from '../components/utils/apiSlice';
import bugReducer from '../containers/bug/bugSlice';
import counterReducer from '../containers/counter/counterSlice';
import loginReducer from '../containers/login/loginSlice';

const entities = combineReducers({
  counter: counterReducer,
  login: loginReducer,
  api: apiReducer,
  bug: bugReducer
})

export default combineReducers({
  entities
})