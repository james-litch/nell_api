import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
     createSubject(input: CreateSubject): Subject @auth
     joinSubject(input: JoinSubject): Subject @auth  

     askAdmin(input: AskAdmin): String! @auth
     clearAskAdmin(input: ClearAskAdmin): String!
  }

  type Subject{
    id: ID!
    name: String!
    admin: User!
    users: [User!]
    dictionary: [Definition!]
    exams: [Exam!]
    questions:[Question!]
    adminQuestions: [String!]
    createdAt: String!
    updatedAt: String!
  }

  input CreateSubject{
    subjectName: String! 
    password: String!
  }

  input JoinSubject{
    subjectId: ID! 
    password: String!
  }

  input AskAdmin{
    subjectId: ID!
    question: String!
  }

  input ClearAskAdmin{
    subjectId: ID!
  }
`;
