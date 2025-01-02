export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product
});

export const updateCartItem = (id, count) => ({
  type: 'UPDATE_CART_ITEM',
  payload: { id, count }
});

export const removeFromCart = (id) => ({
  type: 'REMOVE_FROM_CART',
  payload: id
});

export const clearCart = () => ({
  type: 'CLEAR_CART'
});

export const setPayment = (payment) => ({
  type: 'SET_PAYMENT',
  payload: payment
});

export const setAddress = (address) => ({
  type: 'SET_ADDRESS',
  payload: address
}); 