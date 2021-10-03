import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer';
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [];
const initalState = {};

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middlewares))
);



export const persistor = persistStore(store);

