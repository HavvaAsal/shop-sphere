const initialState = {
  address: null,
  paymentMethod: null
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SHIPPING_ADDRESS':
      return {
        ...state,
        address: action.payload
      };

    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload
      };

    case 'CLEAR_CHECKOUT_DATA':
      return initialState;

    default:
      return state;
  }
};

export default checkoutReducer; 