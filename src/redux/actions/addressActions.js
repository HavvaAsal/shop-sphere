import api from '../../config/api';
import { toast } from 'react-toastify';

// Action Types
export const FETCH_ADDRESSES_START = 'FETCH_ADDRESSES_START';
export const FETCH_ADDRESSES_SUCCESS = 'FETCH_ADDRESSES_SUCCESS';
export const FETCH_ADDRESSES_ERROR = 'FETCH_ADDRESSES_ERROR';
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const SELECT_ADDRESS = 'SELECT_ADDRESS';

// Thunk Actions
export const fetchAddresses = () => async (dispatch) => {
  dispatch({ type: FETCH_ADDRESSES_START });
  try {
    const response = await api.get('/user/address');
    dispatch({ type: FETCH_ADDRESSES_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Adres getirme hatası:', error);
    dispatch({ type: FETCH_ADDRESSES_ERROR, payload: error.message });
    toast.error('Adresler yüklenirken bir hata oluştu');
  }
};

export const addAddress = (addressData) => async (dispatch) => {
  try {
    const response = await api.post('/user/address', addressData);
    dispatch({ type: ADD_ADDRESS_SUCCESS, payload: response.data });
    toast.success('Adres başarıyla eklendi');
    return response.data;
  } catch (error) {
    console.error('Adres ekleme hatası:', error);
    toast.error('Adres eklenirken bir hata oluştu');
    throw error;
  }
};

export const updateAddress = (addressData) => async (dispatch) => {
  try {
    const response = await api.put('/user/address', addressData);
    dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: response.data });
    toast.success('Adres başarıyla güncellendi');
    return response.data;
  } catch (error) {
    console.error('Adres güncelleme hatası:', error);
    toast.error('Adres güncellenirken bir hata oluştu');
    throw error;
  }
};

export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    await api.delete(`/user/address/${addressId}`);
    dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: addressId });
    toast.success('Adres başarıyla silindi');
  } catch (error) {
    console.error('Adres silme hatası:', error);
    toast.error('Adres silinirken bir hata oluştu');
    throw error;
  }
};

export const selectAddress = (address) => ({
  type: SELECT_ADDRESS,
  payload: address
}); 