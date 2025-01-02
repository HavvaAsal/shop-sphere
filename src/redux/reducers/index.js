import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import addressReducer from './addressReducer';
import cardReducer from './cardReducer';
import checkoutReducer from './checkoutReducer';
import orderReducer from './orderReducer';
import clientReducer from './clientReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  address: addressReducer,
  cards: cardReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
  client: clientReducer
});

export default rootReducer; 