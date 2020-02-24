import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
     createSubject(input: CreateSubject): Subject @auth
     joinSubject(input: JoinSubject): Subject @auth  
  }

  type Subject{
    id: ID!
    name: String!
    admin: User!
    users: [User!]
    dictionary: [Definition!]
    exams: [Exam!]
    questions:[Question!]
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
`;
