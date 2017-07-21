import DataLoader from 'dataloader';
import { getItemsByOwner, getUser, getItem } from './jsonServer';

export default function() {
  return {
    getItemsByOwner: new DataLoader(ids => (
      Promise.all(ids.map(id => jsonGetItemsByOwner(id)))
    )),
    getUser: new DataLoader(ids => (
      Promise.all(ids.map(id => getUser(id)))
    )),
    getItem: new DataLoader(ids => (
       Promise.all(ids.map(id => getItem(id)))
    ))
  };
}