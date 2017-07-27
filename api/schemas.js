import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `

  type Item {
    id: ID!
    title: String!
    description: String!
    imageurl: String
    tags: [Tag]
    itemowner: User
    available: Boolean!
    borrower: User
    createdon: String
  }

  type User {
    id: ID!
    email: String!
    fullname: String
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: Int
    title: [String!]
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
    users: [User]
    user(id: ID!): User
    tags:[Tag]
  }

  input AssignedTags {
    id: Int
  }

  type Mutation {
    
    addItem (
      title: String!
      description: String!
      imageurl: String
      tags: [AssignedTags]
      itemowner: ID!
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