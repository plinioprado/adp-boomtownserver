import DataLoader from 'dataloader';
import { getItemsByOwner, getUser, getItem, getBorrowed } from './jsonServer';

export default function() {
  return {
    getItemsByOwner: new DataLoader(ids => (
      Promise.all(ids.map(id => getItemsByOwner(id)))
    )),
    getUser: new DataLoader(ids => (
      Promise.all(ids.map(id => getUser(id)))
    )),
    getItem: new DataLoader(ids => (
       Promise.all(ids.map(id => getItem(id)))
    )),
    getBorrowed: new DataLoader(ids => (
       Promise.all(ids.map(id => getBorrowed(id)))
    ))
  };
}