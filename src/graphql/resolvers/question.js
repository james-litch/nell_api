import { Question } from '../../controllers';

export default {
  Query: {

  },

  Mutation: {
    addQuestion: (root, { input }, { req }, info) => Question.add({
      userId: req.user.id,
      subjectId: input.subjectId,
      question: input.question,
      answers: input.answers,
      correctAnswer: input.correctAnswer,
    }),

    removeQuestions: (root, { input }, { req }, info) => Question.remove({
      userId: req.user.id,
      subjectId: input.subjectId,
      questionIds: input.questionIds,
    }),

    addCurrentQuestion: (root, { input }, { req }, info) => Question.addCurrent({
      subjectId: input.subjectId,
      questionId: input.questionId,
    }),

    removeCurrentQuestion: (root, { input }, { req }, info) => Question.removeCurrent({
      subjectId: input.subjectId,

    }),

    answerQuestion: (root, { input }, { req }, info) => Question.answer({
      userId: req.user.id,
      subjectId: input.subjectId,
      questionId: input.questionId,
      answerIndex: input.answer,
    }),
  },

};
