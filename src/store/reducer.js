import { combineReducers } from 'redux';
import counterReducer from '../containers/counter/counterSlice';

const entities = combineReducers({
  counter: counterReducer
})

export default combineReducers({
  entities
})