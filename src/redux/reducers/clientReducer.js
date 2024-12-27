const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  roles: [],
  theme: 'light',
  language: 'en'
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'AUTH_ERROR':
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false
      };
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