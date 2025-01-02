import {
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCT_DETAILS_START,
  FETCH_PRODUCT_DETAILS_SUCCESS,
  FETCH_PRODUCT_DETAILS_ERROR
} from '../actions/productActions';

const initialState = {
  products: {
    products: [],
    total: 0
  },
  loading: false,
  error: null,
  detail: {
    product: null,
    loading: false,
    error: null
  }
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: {
          products: action.payload.products,
          total: action.payload.total
        },
        error: null
      };

    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case FETCH_PRODUCT_DETAILS_START:
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: true,
          error: null
        }
      };

    case FETCH_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        detail: {
          product: action.payload,
          loading: false,
          error: null
        }
      };

    case FETCH_PRODUCT_DETAILS_ERROR:
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: false,
          error: action.payload
        }
      };

    default:
      return state;
  }
};

export default productReducer;