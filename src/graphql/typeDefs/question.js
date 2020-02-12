import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
    addQuestion(input: AddQuestion) : String @auth
    createExam(input: CreateExam): String @auth
    addCurrentQuestion(input: AddCurrentQuestion): String @auth

    deleteQuestions(input: DeleteQuestions) : String @auth
    deleteExams(input: DeleteExams): String @auth
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

  input AddCurrentQuestion{
    subject: ID!
    description: String!
    question: ID!
  }

  input DeleteQuestions{
    subject: ID!
    questions: [ID!]!
   
  }

  input DeleteExams{
    subject: ID!
    exams: [ID!]!
  }
`;
