import { Subject, User } from '../../controllers';

export default {
  Query: {

  },

  Mutation: {

    createSubject: (root, { input }, { req }, info) => Subject.create({
      userId: req.userId,
      subjectName: input.subjectName,
      password: input.password,
    }),

    joinSubject: (root, { input }, { req }, info) => Subject.join({
      userId: req.userId,
      subjectId: input.subjectId,
      password: input.password,
    }),

  },
  Subject: {
    users: ({ users }, args, context, info) => User.getUsers(users),
    admin: ({ admin }, args, context, info) => User.getUser({ userId: admin }),
  },
};
