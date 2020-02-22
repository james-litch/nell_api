import { Subject, User } from '../../controllers';

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

  },
};
