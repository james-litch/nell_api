import { gql } from 'apollo-server-express';

export default gql`
  type Question{
    id: ID!
    question: String!
    answers: [String!]!
    currectAnswer: String!
    createdAt: String!
    updatedAt: String!
  }
`;
