import api from '../../config/api';
import { toast } from 'react-toastify';

// Action Types
export const CREATE_ORDER_START = 'CREATE_ORDER_START';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_ERROR = 'CREATE_ORDER_ERROR';
export const FETCH_ORDERS_START = 'FETCH_ORDERS_START';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

// Thunk Actions
export const createOrder = (orderData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_START });
  try {
    // API'nin tam olarak beklediği format
    const formattedOrderData = {
      address_id: parseInt(orderData.address_id),
      order_date: orderData.order_date,
      card_no: orderData.card_no,  // string olarak gönder
      card_name: orderData.card_name,
      card_expire_month: parseInt(orderData.card_expire_month),
      card_expire_year: parseInt(orderData.card_expire_year),
      card_ccv: parseInt(orderData.card_ccv),
      price: parseFloat(orderData.price),
      products: orderData.products.map(item => ({
        product_id: parseInt(item.product_id),
        count: parseInt(item.count),
        detail: item.detail || ''
      }))
    };

    console.log('API\'ye gönderilen veri:', formattedOrderData); // Debug için

    const response = await api.post('/order', formattedOrderData);
    
    // Başarılı işlemler
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
    
    return response.data;
  } catch (error) {
    console.error('API Hatası:', error.response?.data);
    dispatch({ type: CREATE_ORDER_ERROR, payload: error.message });
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