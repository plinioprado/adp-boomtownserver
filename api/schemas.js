import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `

  type Item {
    id: ID!
    title: String!
    description: String!
    imageurl: String
    tags: [Tag]!
    itemowner: User!
    createdon: String
    available: Boolean!
    borrower: User
  }

  type User {
    id: ID!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: Int
    title: String!
  }

  input AssignedTag {
    id: Int!
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
    users: [User]
    user(id: ID!): User
    tags:[Tag]
  }

  type Mutation {
    
    addItem (
      title: String!
      description: String!
      imageurl: String
      tags: [AssignedTag]
      itemowner: ID!
    ): Item

    addUser (
      fullname: String!
      bio: String
      email: String!
      password: String!
    ): User
  }
`;

export default makeExecutableSchema({
  typeDefs,
  resolvers
});