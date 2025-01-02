const initialState = {
  items: [],
  total: 0,
  payment: null,
  address: null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(
        item => item.product.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, count: item.count + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        items: [...state.items, { count: 1, checked: true, product: action.payload }]
      };

    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, count: action.payload.count }
            : item
        )
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0
      };

    case 'SET_PAYMENT':
      return { ...state, payment: action.payload };
    
    case 'SET_ADDRESS':
      return { ...state, address: action.payload };

    default:
      return state;
  }
};

export default cartReducer; 