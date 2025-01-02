import api from '../../config/api';
import { toast } from 'react-toastify';

// Action Types
export const FETCH_CATEGORIES_START = 'FETCH_CATEGORIES_START';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';

// Thunk Actions
export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_START });
  try {
    const response = await api.get('/categories');
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_ERROR });
    toast.error('Kategoriler yüklenirken bir hata oluştu');
    throw error;
  }
};

export const setSelectedCategory = (category) => ({
  type: SET_SELECTED_CATEGORY,
  payload: category
});

// Kategori detaylarını getir
export const fetchCategoryDetails = (categoryId) => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_START });
  try {
    const response = await api.get(`/categories/${categoryId}`);
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Kategori detayı getirme hatası:', error);
    dispatch({ type: FETCH_CATEGORIES_ERROR, payload: error.message });
    toast.error('Kategori detayları yüklenirken bir hata oluştu');
  }
}; 