const initialState = {
  orders: [],
  loading: false,
  error: null
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_ORDER_SUCCESS':
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };
    case 'FETCH_ORDERS_SUCCESS':
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    default:
      return state;
  }
} 