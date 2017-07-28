import DataLoader from 'dataloader';
import { getUser, getItemsByOwner, getItem} from './postgresServer';

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
    ))
  };
}