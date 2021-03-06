import { gql } from 'apollo-server-express';

export default gql`

  extend type Query{
    findQuestion(input: FindQuestion): Question! @inSubject
  }

  extend type Mutation{
     addQuestion(input: AddQuestion): Question @admin
     removeQuestions(input: RemoveQuestions): String @admin

     addCurrentQuestion(input: CurrentQuestion): String! @admin
     removeCurrentQuestions(input: RemoveCurrentQuestions): String! @admin

     answerQuestion(input: AnswerQuestion): Question! @inSubject
  }

  type Question{
      id: ID!
      question: String!
      correctAnswer: String!
      answers: [Answer!]!
      answeredBy: [User!]
  }

  type Answer{
      answer: String!
      totalChosen: Int!
  }

  input AddQuestion{
    subjectId: ID!  
    question: String!
    answers:[String!]!
    correctAnswer: Int!
  }

  input RemoveQuestions{
    subjectId: ID!
    questionIds: [ID!]!
  }

  input CurrentQuestion{
    subjectId: ID!
    questionId: ID!
  }

  input RemoveCurrentQuestions{
    subjectId: ID!
    questionIds: [ID!]!
  }

  input AnswerQuestion{
    subjectId: ID!
    questionId: ID!
    answer: Int!
  }

  input FindQuestion{
    subjectId: ID!
    questionId: ID!
  }

`;
