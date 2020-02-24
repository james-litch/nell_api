import { gql } from 'apollo-server-express';

export default gql`

  extend type Mutation{
     addQuestion(input: AddQuestion): Question @admin
     removeQuestions(input: RemoveQuestions): String @admin

     makeQuestionCurrent(input: CurrentQuestion): String @admin
     removeQuestionCurrent(input: CurrentQuestion): String @admin
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
