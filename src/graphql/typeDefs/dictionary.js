import { gql } from 'apollo-server-express';

export default gql`
  # extend type Query{
  #     # definition(phrase: String!): Definition
  #     # definitions: [Definition!]
  # }
  extend type Mutation{
    addDefinition(input: AddDefinition): String @auth
  }

  type Definition{
    id: ID!
    phrase: String!
    definition: String!
  }

  input AddDefinition{
    subject: ID! 
    phrase: String!
    definition: String!
  }
`;
