import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { logger } from 'redux-logger';
import productReducer from './reducers/productReducer';
import clientReducer from './reducers/clientReducer';
import cartReducer from './reducers/cartReducer';
import categoryReducer from './reducers/categoryReducer';
import orderReducer from './reducers/orderReducer';
import addressReducer from './reducers/addressReducer';
import cardReducer from './reducers/cardReducer';

const rootReducer = combineReducers({
  products: productReducer,
  client: clientReducer,
  cart: cartReducer,
  categories: categoryReducer,
  orders: orderReducer,
  address: addressReducer,
  cards: cardReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

export default store;
