import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
     createSubject(input: CreateSubject): Subject @auth
     joinSubject(input: JoinSubject): Subject @auth  
     deleteSubject(input: DeleteSubject): String! @admin
     leaveSubject(input: LeaveSubject): String! @inSubject

     subjectFeedback(input: SubjectFeedback): String! @inSubject
     clearFeedback(input: ClearFeedback): String! @admin
  }

  type Subject{
    id: ID!
    name: String!
    admins: [User!]
    users: [User!]
    dictionary: [Definition!]
    exams: [Exam!]
    questions:[Question!]
    currentQuestions:[Question!]
    feedback: [String!]
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

  input SubjectFeedback{
    subjectId: ID!
    question: String!
  }

  input ClearFeedback{
    subjectId: ID!
  }

  input DeleteSubject{
    subjectId: ID!
  }

  input LeaveSubject{
    subjectId: ID!
  }
`;
