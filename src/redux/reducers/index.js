import { combineReducers } from 'redux';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import clientReducer from './clientReducer';
import cartReducer from './cartReducer';
import addressReducer from './addressReducer';
import cardReducer from './cardReducer';

const rootReducer = combineReducers({
  products: productReducer,
  categories: categoryReducer,
  client: clientReducer,
  cart: cartReducer,
  address: addressReducer,
  cards: cardReducer
});

export default rootReducer; 