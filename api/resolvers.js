import fetch from 'node-fetch';
import { psql } from 'pg';
import { getUser2, createUser2 } from './postgresServer';
import { getUser, getUsers, getItems, getItem, getItemsByOwner, getBorrowed } from './jsonServer';


const resolveFunctions = {
  Query: {
    users() {
      return getUsers();
    },
    // user(root, args, context) {
    //   return getUser(args.id);
    // },
    user(root, args, context) {
      return context.loaders.getUser2.load(args.id);
    },
    items() {
      return getItems();
    },
    item(root, { id }) {
      return getItem(id);
    }
  },

  Item: {
    // TODO: Refactor this and test the possibility return userid in th PG and map back to id in the object
    itemOwner(item, args, context) {
      return context.loaders.getUser2.load(item.itemOwner);
    },
    borrower(item, args, context) {
      if (!item.borrower) return null;
      // return getUser2(item.borrower);
      return context.loaders.getUser2.load(item.borrower);
    }
  },

  User: {
    items: (user) => {
      return getItemsByOwner(user.id);
    },
    borrowed(user) {
      return getBorrowed(user.id);
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
    },

    addUser(user, args, context) {
      return createUser2(args, context);
    }
  }
}

export default resolveFunctions;
