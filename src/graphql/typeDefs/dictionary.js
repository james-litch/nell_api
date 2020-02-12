import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
    addDefinition(input: AddDefinition): String @auth
    deleteDefinitions(input: DeleteDefinitions): String @auth
    
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

  input DeleteDefinitions{
    subject: ID! 
    definitions: [ID!]!
  }
`;
