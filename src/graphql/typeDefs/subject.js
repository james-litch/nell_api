import { gql } from 'apollo-server-express';

export default gql`
  
  extend type Query{
    subject(id: ID!): Subject @auth
  }
 
  extend type Mutation{
    createSubject(name: String!, password: String!): Subject @auth
    joinSubject(id: ID!, password: String!): Subject @auth
  }

  type Subject{
    id: ID!
    name: String!
    creator: User!
    users: [User!]!
    createdAt: String!
    updatedAt: String!
  }
`;
