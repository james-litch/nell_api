import * as UserController from '../../controllers/user';
import { subjectsFromIds } from '../../controllers/subject';

export default {
  Query: {
    me: (root, args, { user }, info) => user,

    users: (root, args, { user }, info) => UserController.getUsers(),

    user: (root, args, { user }, info) => UserController.getUser(args.id),
  },

  Mutation: {

    signUp: (root, args, context, info) => UserController.signUp(args),

    signIn: (root, args, context, info) => UserController.signIn(args),
  },

  User: {
    subjects: ({ subjects }, args, context, info) => subjectsFromIds(subjects),
  },
};
