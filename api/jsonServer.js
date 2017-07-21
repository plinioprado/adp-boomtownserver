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

export const jsonGetById = (resource, id) => {
  if (testResource(resource)) return null;
  return fetch(`http://localhost:3001/${resource}/${id}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

export const jsonGetUserByOwner = (id) => {
  return fetch(`http://:3001/items?itemOwner=${id}`)
    .then(response => response.json())
    .catch(error => console.log(error))
}

