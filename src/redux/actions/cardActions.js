import api from '../../config/api';
import { toast } from 'react-toastify';

// Action Types
export const FETCH_CARDS_START = 'FETCH_CARDS_START';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_ERROR = 'FETCH_CARDS_ERROR';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const SELECT_CARD = 'SELECT_CARD';

// Thunk Actions
export const fetchCards = () => async (dispatch) => {
  dispatch({ type: FETCH_CARDS_START });
  try {
    const response = await api.get('/user/card');
    dispatch({ type: FETCH_CARDS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_CARDS_ERROR, payload: error.message });
  }
};

export const addCard = (cardData) => async (dispatch) => {
  try {
    // Backend'in istediği formata dönüştür
    const formattedData = {
      card_no: cardData.cardNumber.replace(/\s/g, ''),
      expire_month: parseInt(cardData.expiryMonth),
      expire_year: parseInt(cardData.expiryYear),
      name_on_card: cardData.cardHolder
    };

    const response = await api.post('/user/card', formattedData);
    dispatch({ type: ADD_CARD_SUCCESS, payload: response.data });
    toast.success('Kart başarıyla eklendi');
    return response.data;
  } catch (error) {
    toast.error('Kart eklenirken bir hata oluştu');
    throw error;
  }
};

export const updateCard = (cardData) => async (dispatch) => {
  try {
    const formattedData = {
      id: cardData.id,
      card_no: cardData.cardNumber.replace(/\s/g, ''),
      expire_month: parseInt(cardData.expiryMonth),
      expire_year: parseInt(cardData.expiryYear),
      name_on_card: cardData.cardHolder
    };
    const response = await api.put('/user/card', formattedData);
    dispatch({ type: UPDATE_CARD_SUCCESS, payload: response.data });
  } catch (error) {
    toast.error('Kart güncellenirken bir hata oluştu');
  }
};

export const deleteCard = (cardId) => async (dispatch) => {
  try {
    await api.delete(`/user/card/${cardId}`);
    dispatch({ type: DELETE_CARD_SUCCESS, payload: cardId });
  } catch (error) {
    toast.error('Kart silinirken bir hata oluştu');
  }
};

export const selectCard = (card) => ({
  type: SELECT_CARD,
  payload: card
});

export const saveCard = (cardData) => async (dispatch) => {
  try {
    // Kart numarası kontrolü
    if (!cardData.cardNumber) {
      throw new Error('Kart numarası zorunludur');
    }

    const response = await api.post('/cards', cardData);
    dispatch({
      type: 'SAVE_CARD_SUCCESS',
      payload: response.data
    });
    toast.success('Kart başarıyla kaydedildi');
    return response.data;
  } catch (error) {
    toast.error(error.message || 'Kart kaydedilirken bir hata oluştu');
    throw error;
  }
}; 