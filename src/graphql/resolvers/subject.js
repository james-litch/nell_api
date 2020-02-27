import { Subject } from '../../controllers';

export default {
  Query: {
    findSubject: (root, { input }, { req }, info) => Subject.find({
      subjectId: input.subjectId,
    }),
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

    leaveSubject: (root, { input }, { req }, info) => Subject.leave({
      userId: req.user.id,
      subjectId: input.subjectId,
    }),

    subjectFeedback: (root, { input }, { req }, info) => Subject.feedback({
      subjectId: input.subjectId,
      question: input.question,
    }),

    clearFeedback: (root, { input }, { req }, info) => Subject.clearFeedback({
      subjectId: input.subjectId,
    }),

  },
};
