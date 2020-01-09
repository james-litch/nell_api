import { gql } from 'apollo-server-express';

export default gql`
  
  extend type Query{
    subject(id: ID!): Subject @auth
  }
 
  extend type Mutation{
    createSubject(input: CreateSubject): Subject @auth
    joinSubject(input: JoinSubject): Subject @auth

    addDefinition(input: AddDefinition): String @auth
  }

  type Subject{
    id: ID!
    name: String!
    creator: User!
    users: [User!]!
    createdAt: String!
    updatedAt: String!
    dictionary(phrase: String): [Definition!]
    # exams: [Exam!]
    # currentQuestions: [Question!]
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

  input JoinSubject{
    id: ID! 
    password: String!
  }

  input CreateSubject{
    name: String! 
    password: String!
  }

  type Question{
    id: ID!
    question: String!
    answers: [String!]!
    correctAnswer: String!
    createdAt: String!
    updatedAt: String!
  }
`;
