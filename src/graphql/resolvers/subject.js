import { Subject } from '../../controllers';

export default {
  Query: {

  },

  Mutation: {

    createSubject: (root, { input }, { req }, info) => Subject.create({
      userId: req.user.id,
      subjectName: input.subjectName,
      password: input.password,
    }),

    joinSubject: (root, { input }, { req }, info) => Subject.join({
      userId: req.user.id,
      subjectId: input.subjectId,
      password: input.password,
    }),

    deleteSubject: (root, { input }, { req }, info) => Subject.remove({
      subjectId: input.subjectId,
    }),

    askAdmin: (root, { input }, { req }, info) => Subject.ask({
      subjectId: input.subjectId,
      question: input.question,
    }),

    clearAskAdmin: (root, { input }, { req }, info) => Subject.clearAsk({
      subjectId: input.subjectId,
    }),

  },
};
