import fetch from 'node-fetch';
import { psql } from 'pg';
import { createUser2, getItems, getTags, getUser} from './postgresServer';
// import { getUser, getUsers, getItem, getItemsByOwner, getBorrowed } from './jsonServer';


const resolveFunctions = {
  Query: {
    users() {
      return getUsers();
    },
    user(root, args, context) {
      return context.loaders.getUser.load(args.id);
    },
    items() {
      return getItems();
    },
    item(root, args, context) {
      return context.loaders.getItem.load(args.id);
    }
  },

  Item: {
    tags(item, args, context) {
      return getTags(item.id);
    },
    itemowner(item, args, context) {
      return getUser(item.itemowner);
    },
    borrower(item, args, context) {
      if (!item.borrower) return null;
      return getUser(item.borrower);
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
      return addItem2(args);
    },

    addUser(user, args, context) {
      return createUser2(args, context);
    }
  }
}

export default resolveFunctions;
