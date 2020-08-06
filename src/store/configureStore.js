import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import callApi from './middleware/callApi';
import logger from './middleware/logger';
import reducer from './reducer';


const store = configureStore({
  reducer,
  middleware: [ ...getDefaultMiddleware({ serializableCheck: false }), logger, callApi]
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducer', () => {
    const newRootReducer = require('./reducer').default
    store.replaceReducer(newRootReducer)
  })
}

export default store