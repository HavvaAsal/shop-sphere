import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import productReducer from './reducers/productReducer';
import clientReducer from './reducers/clientReducer';
import cartReducer from './reducers/cartReducer';
import categoryReducer from './reducers/categoryReducer';

const rootReducer = combineReducers({
  products: productReducer,
  client: clientReducer,
  cart: cartReducer,
  categories: categoryReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

export default store;
