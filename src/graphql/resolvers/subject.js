import * as SubjectController from '../../controllers/subject';
import * as UserController from '../../controllers/user';

export default {
  Mutation: {
    createSubject: (root, args, { user }, info) => SubjectController.createSubject({
      user,
      name: args.name,
      password: args.password,
    }),

    joinSubject: (root, args, { user }, info) => SubjectController.joinSubject({
      user,
      id: args.id,
      password: args.password,
    }),
  },
  Subject: {
    creator: ({ creator }, args, context, info) => UserController.getUser(creator),
    users: ({ id }, args, context, info) => UserController.getUser(id),
  },
};
