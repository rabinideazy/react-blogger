import isEmpty from 'lodash/isEmpty';

export function loggedIn() { //logged in services
  let userDetails = localStorage.getItem('userDetails');
  return !isEmpty( userDetails ) ? JSON.parse( userDetails ) : undefined;
}

export function loggedOut() { //logged out services
  localStorage.clear();
  window.location.href = "/";
}

export function setUserData( userData ) { //set user details
  localStorage.setItem('userDetails', JSON.stringify(userData));
}

export function getItem( data ) { //get data in localstorage
  return JSON.parse( localStorage.getItem(data) );
}

export function setItem(key, value) { //set data in localstorage
  return localStorage.setItem(`${key}`, JSON.stringify(value));
}

export function removeItem( data ) { //remove data from localstorage
  localStorage.removeItem( data );
}