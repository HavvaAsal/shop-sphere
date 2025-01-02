import {
  FETCH_ADDRESSES_START,
  FETCH_ADDRESSES_SUCCESS,
  FETCH_ADDRESSES_ERROR,
  ADD_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_SUCCESS,
  SELECT_ADDRESS
} from '../actions/addressActions';

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedAddress: null
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADDRESSES_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        error: null
      };

    case FETCH_ADDRESSES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        items: state.items.map(address => 
          address.id === action.payload.id ? action.payload : address
        )
      };

    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        items: state.items.filter(address => address.id !== action.payload)
      };

    case SELECT_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload
      };

    default:
      return state;
  }
};

export default addressReducer; 