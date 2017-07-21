import fetch from 'node-fetch';
import { getUsers, getUser, getItems, getItem, jsonGetItemsByOwner } from './jsonServer';

const resolveFunctions = {
  Query: {
    users() {
      return getUsers();
    },
    user(root, { id }) {
      return getUser(id);     
    },
    items() {
      return getItems();
    },
    item(root, { id }) {
      return getItem(id);     
    }
  },

  Item: {
    itemOwner(item) {
      return getUser(item.itemOwner);
    },
    borrower(item) {
      if (!item.borrower) return null;
      return getItem(item.borrower);
    }
  },

  User: {
    items: (user, args, context) => {
      return context.loaders.getUserByOwner(user.id);
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
