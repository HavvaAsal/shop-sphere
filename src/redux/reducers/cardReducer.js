import {
  FETCH_CARDS_START,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_ERROR,
  ADD_CARD_SUCCESS,
  UPDATE_CARD_SUCCESS,
  DELETE_CARD_SUCCESS,
  SELECT_CARD
} from '../actions/cardActions';

const initialState = {
  wallet: [
    {
      id: 1,
      card_no: '5421 19** **** 5420',
      name_on_card: 'JOHN DOE',
      expire_month: 3,
      expire_year: 2025,
      selected: false
    }
  ],
  loading: false,
  error: null,
  selectedCard: null
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        wallet: action.payload,
        error: null
      };

    case FETCH_CARDS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case ADD_CARD_SUCCESS:
      return {
        ...state,
        wallet: [...state.wallet, action.payload]
      };

    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        wallet: state.wallet.map(card =>
          card.id === action.payload.id ? action.payload : card
        )
      };

    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        wallet: state.wallet.filter(card => card.id !== action.payload)
      };

    case SELECT_CARD:
      return {
        ...state,
        selectedCard: action.payload
      };

    default:
      return state;
  }
};

export default cardReducer; 