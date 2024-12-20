import axios from 'axios';
import { setRoles, loginSuccess, loginFailure,signupSuccess, signupFailure } from './clientActions';
import { ENDPOINTS } from  "../../config/api";

// Thunk action creator to fetch roles only when needed
export const fetchRolesIfNeeded = () => (dispatch, getState) => {
  const { roles } = getState().client;
  
  // Only fetch if roles array is empty
  if (roles.length === 0) {
    return fetch('/api/roles')
      .then(response => response.json())
      .then(roles => dispatch(setRoles(roles)))
      .catch(error => console.error('Error fetching roles:', error));
  }
  
  return Promise.resolve();
};

// Login thunk
export const loginUser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(ENDPOINTS.LOGIN, data);
    dispatch(loginSuccess(response.data)); // Assuming response.data contains user info
  } catch (error) {
    dispatch(loginFailure(error.message));
    console.error('Login failed:', error);
  }
};

export const signupUser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(ENDPOINTS.SIGNUP, data);
    dispatch(signupSuccess(response.data)); // Assuming response.data contains user info
  } catch (error) {
    dispatch(signupFailure(error.message));
    console.error('Signup failed:', error);
  }
};