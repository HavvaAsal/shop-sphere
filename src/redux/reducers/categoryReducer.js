const initialState = {
  items: [],
  loading: false,
  error: null,
  topCategories: []
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        loading: false,
        items: action.payload,
        topCategories: action.payload
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5)
      };
    case 'FETCH_CATEGORIES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default categoryReducer; 