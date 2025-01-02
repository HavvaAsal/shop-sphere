import api from '../../config/api';
import { toast } from 'react-toastify';

// Action Types
export const FETCH_PRODUCTS_START = 'FETCH_PRODUCTS_START';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
export const FETCH_PRODUCT_DETAILS_START = 'FETCH_PRODUCT_DETAILS_START';
export const FETCH_PRODUCT_DETAILS_SUCCESS = 'FETCH_PRODUCT_DETAILS_SUCCESS';
export const FETCH_PRODUCT_DETAILS_ERROR = 'FETCH_PRODUCT_DETAILS_ERROR';

// Thunk Actions
export const fetchProducts = ({ queryString = '' }) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_START });
  try {
    const response = await api.get(`/products?${queryString}`);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_ERROR, payload: error.message });
    toast.error('Ürünler yüklenirken bir hata oluştu');
  }
};

export const fetchProductDetails = (productId) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_DETAILS_START });
  try {
    const response = await api.get(`/products/${productId}`);
    dispatch({ type: FETCH_PRODUCT_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Ürün detayı getirme hatası:', error);
    dispatch({ type: FETCH_PRODUCT_DETAILS_ERROR, payload: error.message });
    toast.error('Ürün detayları yüklenirken bir hata oluştu');
  }
};

// Kategori bazlı ürün getirme
export const fetchProductsByCategory = (categoryId) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_START });
  try {
    const response = await api.get(`/products/category/${categoryId}`);
    dispatch({ 
      type: FETCH_PRODUCTS_SUCCESS, 
      payload: {
        products: response.data.products || [],
        total: response.data.total || 0
      }
    });
  } catch (error) {
    console.error('Kategori ürünleri getirme hatası:', error);
    dispatch({ type: FETCH_PRODUCTS_ERROR, payload: error.message });
    toast.error('Kategori ürünleri yüklenirken bir hata oluştu');
  }
};