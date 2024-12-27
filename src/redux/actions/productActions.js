import api, { ENDPOINTS } from '../../config/api';

export const fetchProducts = (queryString = '') => async (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCTS_START' });
  
  try {
    const url = `${ENDPOINTS.PRODUCTS}${queryString ? `?${queryString}` : ''}`;
    const response = await api.get(url);
    
    dispatch({ 
      type: 'FETCH_PRODUCTS_SUCCESS', 
      payload: {
        products: response.data.products,
        total: response.data.total
      }
    });
  } catch (error) {
    console.error('Products error:', error);
    dispatch({ 
      type: 'FETCH_PRODUCTS_ERROR', 
      payload: error.message 
    });
  }
};

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  payload: filter
});

export const setSorting = (sortBy) => ({
  type: 'SET_SORTING',
  payload: sortBy
});

export const setPage = (page) => ({
  type: 'SET_PAGE',
  payload: page
});
