import pool from '../database';
import admin from 'firebase-admin';

export function getUser2(id) {

  return new Promise(async (res, rej) => {
    try {
        let user = await pool.query(`SELECT * FROM user_profiles WHERE id='${id}'`);
        const fbUser = await admin.auth().getUser(id);
        user = user.rows[0];
        user = {...user, email: fbUser.email };
        res(user);
    } catch(error) {
        console.log(error);
        rej(error);
    }
  });
}

export function addItem2(args) {
  console.log('will create Item');

    try {

      return new Promise(async (resolve, reject) => {
        const itemQuery = {
          text: 'hv jkldfh jlk',
          values: [args.a, args.b]
        }
        const newItem = await pool.query(itemQuery);
        function inserttags(tags) {
          return tags.map(tag => {
            return `(${item.id}, ${tag.id})`;
          }).join(',')
        };
      const tagQuery = {
          text: 'INSERT INTO itemtags (itemid, tagid) VALUES (${insertTags(args.tags)});'
      }
      const tags = await pool.query(tagQuery);
      resolve({id: newItem.rows[0].id});
      });

    } catch(err) {
      console.log(err);
      reject(err);
    }

  // return {
  //   title: 'newtitle',
  //   description: 'my description msnm fjksl hfjlhj fskjlh fljks hjkflsjlsf',
  //   imageurl: 'http://hjklhjklhjklhjklhjlkkhjl',
  //   tags: [{id: 1, title: 'aaaaaa'}, {id: 2, title: 'bbbbbb'}],
  //   itemowner: '1111111111111111'
  // }
};


export function getItems2(id) {

  return new Promise(async (res, rej) => {
    try {
        let items = await pool.query(`SELECT *, itemid AS id FROM items`);
        items.rows = items.rows.map(it => {
          if (it.borrower) it.borrower = { id: it.borrower, fullname: 'xxx'};
            else delete it.borrower;
          return it
        });
        console.log(items.rows);
        res(items.rows);
    } catch(error) {
        console.log(error);
        rej(error);
    }
  });
}

export function getTags(itemId) {
  return pool.query(`select * from tags`);
}

export function createUser2(args, context) {

    return new Promise(async (res, rej) => {

      try {

        let fbUser = await admin.auth().createUser({
          email: args.email,
          password: args.password
        });
        
        const query = {
          text: `INSERT INTO user_profiles (id, fullname, bio) VALUES ($1, $2, $3) RETURNING *`,
          values: [fbUser.uid, args.fullname, args.bio]
        }
        let pgUser = await pool.query(query);

        let user = { ...pgUser.rows[0], email: fbUser.email, id: fbUser.uid };
        res(user);

      } catch(error) {
          console.log(error);
          rej(error);
      }
  });
}

function createItem(args, contect) {

  console.log('will creata Item');
  return {

  }

}
