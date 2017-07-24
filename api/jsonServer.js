import fetch from 'node-fetch';

export const getItemsByOwner = (id) => {
  return fetch(`http://localhost:3001/items?itemOwner=${id}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getUsers = () => {
  return fetch(`http://localhost:3001/users`)
    .then(response => response.json())
    .catch(error => console.log(error))
} 

export const getUser = (id) => {
  if (!id)return null;
  return fetch(`http://localhost:3001/users/${id}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getItems = () => {
  return fetch(`http://localhost:3001/items`)
    .then(response => response.json())
    .catch(error => console.log(error))  
}

export const getItem = (userId) => {
  return fetch(`http://localhost:3001/items/${userId}`)
    .then(response => response.json())
    .catch(error => console.log(error))  
}

export const getBorrowed = (userId) => {
  return fetch(`http://localhost:3001/items?borrower=${userId}`)
    .then(response => response.json())
    .catch(errors => console.log(errors));
}
