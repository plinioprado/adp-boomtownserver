import pool from '../database';
import admin from 'firebase-admin';

export function getItems() {

  return new Promise(async (res, rej) => {
    try {
       const queryText =  `SELECT id, title, description, imageurl, itemowner, createdon, available, borrower FROM items`;
       let items = await pool.query(queryText);
       res(items.rows);
    } catch(error) {
        rej(error);
    }
  });
}

export function getItem(id) {

  return new Promise(async (res, rej) => {
    try {
       const queryText =  `SELECT id, i.title, i.description, i.imageurl, itemowner, createdon, available, borrower FROM items WHERE id = ${id}`;
       let items = await pool.query(queryText);
       res(items.rows[0]);
    } catch(error) {
        rej(error);
    }
  });
}

export function getItemsByOwner(id) {

  return new Promise(async (res, rej) => {
    try {
       const queryText =  `SELECT id, title, description, imageurl, itemowner, createdon, available, borrower FROM items WHERE itemowner = '${id}'`;
       let items = await pool.query(queryText);
       res(items.rows);
    } catch(error) {
        rej(error);
    }
  });
}

export function getBorrowed(id) {

  return new Promise(async (res, rej) => {
    try {
       const queryText =  `SELECT id, title, description, imageurl, itemowner, createdon, available, borrower FROM items WHERE borrower = '${id}'`;
       let items = await pool.query(queryText);
       res(items.rows);
    } catch(error) {
        rej(error);
    }
  });
}

export function addItem(args, context) {
  return new Promise(async(res,rej)=>{
    try {
      const itemQuery = {
        text: 'INSERT INTO items(title, description, imageurl, itemowner) VALUES($1, $2, $3, $4) RETURNING *',
        values: [args.title, args.description, args.imageurl, args.itemowner]
      }
      const newItem = await pool.query(itemQuery) //inserted item reference
      function insertTag(tags) {
        return tags.map(tag=>{
          return `(${newItem.rows[0].id}, ${tag.id})`
        }).join(',')
    }
      const tagQuery ={
          text: `INSERT INTO itemtags(itemid, tagid) VALUES ${insertTag(args.tags)}`
      }
      const tags = await pool.query(tagQuery)
      res({...newItem.rows[0], title: newItem.rows[0].title})
    } catch(error) {
      rej(error)
    }
})
}

export function getTags(id) {

  return new Promise(async (res, rej) => {
    try {
       const queryText =  `SELECT t.title FROM itemtags it INNER JOIN tags t ON it.tagid = t.tagid WHERE it.itemid = ${id}`;
       let items = await pool.query(queryText);
       res(items.rows);
    } catch(error) {
        rej(error);
    }
  });
}

export function getUser(id) {
  return new Promise(async (res, rej) => {
    try {
        let user = await pool.query(`SELECT * FROM user_profiles WHERE id='${id}'`);
        const fbUser = await admin.auth().getUser(id);
        user = user.rows[0];
        user = {...user, email: fbUser.email };
        res(user);
    } catch(error) {
        rej(error);
    }
  });
}

export function addUser(args, context) {

    return new Promise(async (res, rej) => {

      try {
        console.log('will log fb')
        let fbUser = await admin.auth().createUser({
          email: args.email,
          password: args.password
        });
        console.log('got id'+fbUser.uid);
        const query = `INSERT INTO user_profiles (id, fullname, bio) VALUES ('${fbUser.uid}', '${args.fullname}', '${args.bio}') RETURNING *`;
        console.log(query);
        let pgUser = await pool.query(query);

        let user = { ...pgUser.rows[0], email: fbUser.email, id: fbUser.uid };
        res(user);

      } catch(error) {
        console.log('error', error)
          rej(error);
      }
  });
}


// export function updItemBorrower(args) {
//    const query = {
//        text: ‘UPDATE items SET borrower=$1 WHERE id=$2 RETURNING *‘,
//        values: [args.borrower, args.id]
//    }
//    return pool.query(query).then(response => {
//        return (response.rows[0]);
//    }).catch(errors => console.log(errors));
// }



export function updItemBorrower(item) {

  return new Promise(async (res, rej) => {
    try {
       const queryText =  `UPDATE items SET borrower = '${item.borrower}' WHERE id = ${item.id} RETURNING *`;
       let items = await pool.query(queryText);
       res(items.rows);
    } catch(error) {
        rej(error);
    }
  });
}
 