import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
     addQuestion(input: AddQuestion): Question @auth
     removeQuestions(input: RemoveQuestions): String @auth

     makeQuestionCurrent(input: CurrentQuestion): String @auth
     removeQuestionCurrent(input: CurrentQuestion): String @auth
}

  type Question{
      id: ID!
      question: String!
      correctAnswer: String!
      answers: [Answer!]!
      currentQuestion: Boolean!
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

`;
