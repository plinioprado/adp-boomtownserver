import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `

  type Item {
    id: ID!
    title: String!
    description: String!
    imageUrl: String
    tags: [String]
    itemOwner: User
    createdOn: Int!
    available: Boolean!
    borrower: User
  }

  type User {
    id: ID!
    email: String!
    fullname: String
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addItem (
      title: String!
      description: String!
      imageUrl: String
      tags: [String!]
      itemOwner: ID!
    ): Item

    addUser (
      fullname: String!
      email: String!
      bio: String
      password: String!
    ): User
  }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers
});