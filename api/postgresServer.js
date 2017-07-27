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

export function createUser(args, context) {

  return new Promise(async (res, rej) => {
    try {

      let fbUser = await admin.auth().createUser({
        email: args.email,
        password: args.password
      });

      const query = {
        text: `INSERT INTO user_profiles (id, fullname, bio)
          VALUES ( $1, $2, $3) returning *`,
        values: [args.id, args.fullname, fbUser.uid]
      }
      let pgUser = await pool.query(query);

      let user = { ...pgUser.rows[0], email: fbUser.email, id: fbUser.uid };
      resolve(user);
    } catch(err) {
    console.log(err);
    }
  });
}