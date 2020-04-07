import { gql } from 'apollo-server-express';

export default gql`

  extend type Query{
    findExam(input: FindExam): Exam! @inSubject
  }

  extend type Mutation{
     createExam(input: CreateExam): Exam! @admin
     removeExams(input: RemoveExams): String! @admin
  }

  type Exam{
    id:ID!
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

  input RemoveExams{
    subjectId: ID!
    examIds: [ID!]!
  }

  input FindExam{
    subjectId: ID!
    examId: ID!
  }


`;
