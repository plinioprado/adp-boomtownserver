import fetch from 'node-fetch';

const testResource = resource => {
  if (!['items', 'users'].find(it => it === resource).length) {
    console.log('invalid resource');
    return false;
  }
}

export const jsonGet = (resource) => {
  if (testResource(resource)) return null;
  return fetch(`http://localhost:3001/${resource}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getItemsByOwner = (id) => {
  return fetch(`http://:3001/items?itemOwner=${id}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getUsers = () => {
  return fetch(`http://localhost:3001/users`)
    .then(response => response.json())
    .catch(error => console.log(error))
} 

export const getUser = (id) => {
  return fetch(`http://localhost:3001/users/${id}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const getItems = () => {
  return fetch(`http://localhost:3001/items`)
    .then(response => response.json())
    .catch(error => console.log(error))  
}

export const getItem = (id) => {
  return fetch(`http://localhost:3001/items/${id}`)
    .then(response => response.json())
    .catch(error => console.log(error))  
}

