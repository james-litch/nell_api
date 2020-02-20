import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
     addDefinition(input: AddDefinition): Definition @auth
     removeDefinitions(input: RemoveDefinitions): String @auth
  }

  type Definition{
      id: ID!
      phrase: String!
      definition: String!
  }

  input AddDefinition{
    subjectId: ID!  
    phrase: String!
    definition: String!
  }

  input RemoveDefinitions{
    subjectId: ID!
    definitionIds: [ID!]!
  }

  
`;
