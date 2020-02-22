import { User, Subject } from '../../controllers';

export default {
  Query: {
    me: (root, { input }, { req }, info) => User.getUser({
      userId: req.user.id,
    }),

  },

  Mutation: {
    signUp: (root, { input }, context, info) => User.signUp({
      name: input.name,
      email: input.email,
      password: input.password,
    }),

    signIn: (root, { input }, context, info) => User.signIn({
      email: input.email,
      password: input.password,
    }),

    invalidateToken: (root, args, { req }, info) => User.endSession({
      userId: req.user.id,
    }),

    changePassword: (root, { input }, { req }, info) => User.changePassword({
      userId: req.user.id,
      oldPassword: input.oldPassword,
      newPassword: input.newPassword,
    }),
  },

};
