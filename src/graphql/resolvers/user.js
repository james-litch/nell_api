import { UserController, SubjectController } from '../../controllers';

export default {
  Query: {
    me: (root, args, { req }, info) => UserController.getUser(req.userId),

    users: (root, args, { req }, info) => UserController.getUsers(),

    user: (root, args, { req }, info) => UserController.getUser(args.id),
  },

  Mutation: {
    signUp: (root, { input }, context, info) => UserController.signUp({
      name: input.name,
      email: input.email,
      password: input.password,
    }),

    signIn: (root, { input }, context, info) => UserController.signIn({
      email: input.email,
      password: input.password,
    }),

    invalidateToken: (root, { input }, { req }, info) => UserController.invalidateToken(req.userId),

    changePassword: (root, { input }, { req }, info) => UserController.changePassword({
      userId: req.userId,
      newPassword: input.newPassword,
      oldPassword: input.oldPassword,
    }),
    // TODO: finish
    deleteAccount: (root, args, { req }, info) => UserController.deleteAccount(req.userId),
  },

  User: {
    subjects: ({ subjects }, args, context, info) => SubjectController.subjectsFromIds(subjects),
  },
};
