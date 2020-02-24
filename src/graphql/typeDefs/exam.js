import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
     createExam(input: CreateExam): Exam! @admin
  }

  type Exam{
    name: String!
    description: String!
    questions: [Question!]!
  }

  input CreateExam{
    subjectId: ID!
    name: String!
    description: String!
    questions: [ID!]!
  }


`;
