import api from '../../config/api';
import { toast } from 'react-toastify';

// Action Types
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

// Thunk Actions
export const createOrder = (orderData) => async (dispatch) => {
  try {
    const response = await api.post('/order', orderData);
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrders = () => async (dispatch) => {
  try {
    const response = await api.get('/order');
    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    toast.error('Siparişler yüklenirken bir hata oluştu');
    throw error;
  }
}; 