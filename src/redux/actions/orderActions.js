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
    // API'nin beklediği formatta veriyi hazırla
    const formattedOrderData = {
      address_id: orderData.address_id,
      order_date: new Date().toISOString(),
      card_no: orderData.card_no.replace(/\s/g, ''),
      card_name: orderData.card_name,
      card_expire_month: orderData.card_expire_month,
      card_expire_year: orderData.card_expire_year,
      card_ccv: orderData.card_ccv,
      price: orderData.price,
      products: orderData.products.map(item => ({
        product_id: item.product_id,
        count: item.count,
        detail: item.detail
      }))
    };

    const response = await api.post('/order', formattedOrderData);
    
    // Sipariş başarılı
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: response.data });
    
    // Sepeti temizle
    dispatch({ type: 'CLEAR_CART' });
    
    // Checkout verilerini temizle
    dispatch({ type: 'CLEAR_CHECKOUT_DATA' });
    
    // Başarı mesajı göster
    toast.success('Siparişiniz başarıyla oluşturuldu! Teşekkür ederiz.');
    
    return response.data;
  } catch (error) {
    dispatch({ type: CREATE_ORDER_ERROR, payload: error.message });
    toast.error('Sipariş oluşturulurken bir hata oluştu');
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