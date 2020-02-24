import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
     addDefinition(input: AddDefinition): Definition @admin
     removeDefinitions(input: RemoveDefinitions): String @admin
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
