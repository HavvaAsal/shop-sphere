import api, { ENDPOINTS } from '../../config/api';

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: 'FETCH_CATEGORIES_START' });
  
  try {
    const response = await api.get(ENDPOINTS.CATEGORIES);
    console.log('Categories response:', response.data); // Debug için
    
    dispatch({ 
      type: 'FETCH_CATEGORIES_SUCCESS', 
      payload: response.data 
    });
  } catch (error) {
    console.error('Categories error:', error); // Debug için
    dispatch({ 
      type: 'FETCH_CATEGORIES_ERROR', 
      payload: error.message 
    });
  }
}; 