import fetch from 'node-fetch';
import { jsonGet, jsonGetById, jsonGetItemsByOwner } from './jsonServer';


const resolveFunctions = {
  Query: {
    users() {
      return jsonGet('users');
    },

    user(root, { id }) {
      return jsonGetById('users', id);     
    },
    items() {
      return jsonGet('items');
    },
    item(root, { id }) {
      return jsonGetById('items', id);     
    }
  },

  Item: {
    itemOwner(item) {
      return jsonGetById('users', item.itemOwner);
    },
    borrower(item) {
      if (!item.borrower) return null;
      return jsonGetById('items', item.borrower);
    }
  },

  User: {
    items(user) {
      return jsonGetItemsByOwner(user.id)
    }
  },

  Mutation: {

    addItem(root, args) {
      console.log(args);
      const newItem = {
        title: args.title,
        description: args.description,
        imageUrl: args.imageUrl,
        tags: args.tags,
        itemOwner: args.itemOwner,
        createdOn: Math.floor(Date.now() / 1000),
        available: false,
        borrower: null
      }
      return fetch(`http://localhost:3001/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      })
        .then(response => response.json())
        .catch(error => console.log(error));
    }
  }
}


export default resolveFunctions;
