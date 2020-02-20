import { Question } from '../../controllers';

export default {
  Query: {

  },

  Mutation: {
    addQuestion: (root, { input }, { req }, info) => Question.add({
      userId: req.userId,
      subjectId: input.subjectId,
      question: input.question,
      answers: input.answers,
      correctAnswer: input.correctAnswer,
    }),

    removeQuestions: (root, { input }, { req }, info) => Question.remove({
      userId: req.userId,
      subjectId: input.subjectId,
      questionIds: input.questionIds,
    }),

    makeQuestionCurrent: (root, { input }, { req }, info) => Question.makeCurrent({
      userId: req.userId,
      subjectId: input.subjectId,
      questionId: input.questionId,
    }),

    removeQuestionCurrent: (root, { input }, { req }, info) => Question.removeCurrent({
      userId: req.userId,
      subjectId: input.subjectId,
      questionId: input.questionId,
    }),
  },

};
