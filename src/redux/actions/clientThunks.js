import axios from 'axios';
import { setRoles } from './clientActions';

// Thunk action creator to fetch roles only when needed
export const fetchRolesIfNeeded = () => (dispatch, getState) => {
  const { roles } = getState().client;
  
  // Only fetch if roles array is empty
  if (roles.length === 0) {
    // Simulating an API call
    return fetch('/api/roles')
      .then(response => response.json())
      .then(roles => dispatch(setRoles(roles)))
      .catch(error => console.error('Error fetching roles:', error));
  }
  
  // Return a resolved promise if roles are already loaded
  return Promise.resolve();
};
