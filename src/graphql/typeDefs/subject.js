import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
     createSubject(input: CreateSubject): Subject @auth
     joinSubject(input: JoinSubject): Subject @auth  
     deleteSubject(input: DeleteSubject): String! @admin

     askAdmin(input: AskAdmin): String! @auth
     clearAskAdmin(input: ClearAskAdmin): String! @admin
  }

  type Subject{
    id: ID!
    name: String!
    admin: User!
    users: [User!]
    dictionary: [Definition!]
    exams: [Exam!]
    questions:[Question!]
    currentQuestions:[Question!]
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

  input DeleteSubject{
    subjectId: ID!
  }
`;
