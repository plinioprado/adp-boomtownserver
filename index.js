import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import {
  graphqlExpress,
  graphiqlExpress
} from 'graphql-server-express';
import schema from './api/schemas';
import cors from 'cors';
import createLoaders from './api/loaders';
import firebaseAuthMiddleware from './api/middleware';

import admin from 'firebase-admin';

import { serviceAccount } from './firebase/servicekey';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://boomtown-6e182.firebaseio.com"
});

const GQL_PORT = 4400;
const app = express();

dotenv.config();
// console.log(process.env);

app.use('*', cors());

app.use(bodyParser.json());

// app.use('/graphql', firebaseAuthMiddleware); // TODO: later activate using process.env.NODE_ENV

app.use('/graphql', graphqlExpress(req => {
  return {
    schema,
    context: {
      loaders: createLoaders()
    }
  }
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.listen(GQL_PORT, () => console.log(`GraphicQL running on localhost: ${GQL_PORT}/graphql`));
