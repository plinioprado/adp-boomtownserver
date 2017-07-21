import express from 'express';
import bodyParser from 'body-parser';
import { 
  graphqlExpress, 
  graphiqlExpress 
} from 'graphql-server-express';
import schema from './api/schemas';
import cors from 'cors';
import createLoaders from './api/loaders';

const GQL_PORT = 4400;
const app =  express();

app.use('*', cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    loaders: createLoaders()
  }
 }));

app.use('/graphiql', graphiqlExpress({ 
  endpointURL: '/graphql'
}));

app.listen(GQL_PORT, () => console.log(`GraphicQL running on localhost: ${GQL_PORT}/graphql`));
