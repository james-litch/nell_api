import { UserController, SubjectController } from '../../controllers';

export default {
  Query: {
    me: (root, args, { user }, info) => UserController.getUser(user.id),

    users: (root, args, { user }, info) => UserController.getUsers(),

    user: (root, args, { user }, info) => UserController.getUser(args.id),
  },

  Mutation: {
    signUp: (root, { input }, context, info) => UserController.signUp(input),

    signIn: (root, { input }, context, info) => UserController.signIn(input),
  },

  User: {
    subjects: ({ subjects }, args, context, info) => SubjectController.subjectsFromIds(subjects),
  },
};
