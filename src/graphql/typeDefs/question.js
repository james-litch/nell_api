import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
    addQuestion(input: AddQuestion) : String @auth
    createExam(input: CreateExam): String @auth
    createCurrentQuestion(input: CreateCurrentQuestion): String @auth
  }

  type Question{
    id: ID!
    question: String!
    answers: [String!]!
    correctAnswer: String!
    createdAt: String!
    updatedAt: String!
  }

  type Exam{
    name: String!
    description: String!
    questions: [Question!]!
  }

  type CurrentQuestion{
    description: String!
    question: Question!
    answeredRight: Int!
    
  }

  input AddQuestion{
    subject: ID!
    question: String!
    answers: [String!]!
    correctAnswer: String!
  }

  input CreateExam{
    subject: ID!
    name: String!
    description: String!
    questions: [ID!]!
  }

  input CreateCurrentQuestion{
    subject: ID!
    description: String!
    questions: ID!
  }
`;
