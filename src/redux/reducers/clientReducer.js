const initialState = {
  user: null,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'en'
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ROLES':
      return { ...state, roles: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SIGNUP_SUCCESS':
      return { ...state, user: action.payload };
    case 'SIGNUP_FAILURE':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default clientReducer;