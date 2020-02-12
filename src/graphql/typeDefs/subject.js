import { gql } from 'apollo-server-express';

export default gql`
  
  extend type Query{
    subject(id: ID!): Subject @auth
  }
 
  extend type Mutation{
    createSubject(input: CreateSubject): Subject @auth
    joinSubject(input: JoinSubject): Subject @auth  
    leaveSubject(input: LeaveSubject): String @auth
    askCreator(input: AskCreator): String @auth
  }

  type Subject{
    id: ID!
    name: String!
    creator: User!
    users: [User!]!
    createdAt: String!
    updatedAt: String!
    dictionary(phrase: String): [Definition!]
    exams: [Exam!]
    currentQuestions: [CurrentQuestion!]
    questions: [Question!]
    creatorQuestions: [String!]
  }

  input JoinSubject{
    id: ID! 
    password: String!
  }

  input CreateSubject{
    name: String! 
    password: String!
  }

  input LeaveSubject{
    subjectId: ID!
  }

  input AskCreator{
    subjectId: ID!
    question: String!
  }
`;
